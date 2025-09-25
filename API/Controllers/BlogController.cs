using API.Controllers;
using API.Entities;
using API.Services;
using API.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Data;

public class BlogController(UnitOfWork unit, EmailService emailService) : BaseApiController
{
    [Authorize]
    [HttpPost("create")]
    public async Task<ActionResult<BlogPost>> CreateBlogPost(BlogPost blogPost)
    {
        unit.Repository<BlogPost>().Add(blogPost);

        if (!await unit.Complete())
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create blog post");
        }

        var subscribers = await unit.Repository<BlogSubscription>().ListAllAsync();

        foreach (var sub in subscribers)
        {
            var result = await emailService.SendNewBlogPostNotification(sub.Email, blogPost.Heading, blogPost.Slug);

            if (!result)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, "Failed to send email");
            }
        }

        return CreatedAtAction(nameof(GetBlogPost), new { slug = blogPost.Slug }, blogPost);
    }

    [Authorize]
    [HttpPut("update")]
    public async Task<ActionResult<BlogPost>> UpdateBlogPost(BlogPost blogPost)
    {
        unit.Repository<BlogPost>().Update(blogPost);

        if (!await unit.Complete())
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update blog post");
        }

        return Ok(blogPost);
    }

    [HttpGet("get-all")]
    public async Task<ActionResult<IReadOnlyList<BlogPost>>> GetAllBlogPosts()
    {
        var spec = new BlogSpecification(null);
        var blogPosts = await unit.Repository<BlogPost>().ListAsync(spec);

        return Ok(blogPosts);
    }

    [HttpGet("get/{slug}")]
    public async Task<ActionResult<BlogPost>> GetBlogPost(string slug)
    {
        var spec = new BlogSpecification(slug);

        var blogPost = await unit.Repository<BlogPost>().FindAsync(spec);

        return Ok(blogPost);
    }

    [HttpPost("subscribe")]
    public async Task<ActionResult> Subscribe(BlogSubscription blogSubscription)
    {
        var spec = new BlogSubscriptionSpecification(blogSubscription.Email);

        var exists = await unit.Repository<BlogSubscription>().FindAsync(spec);

        if (exists != null)
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Email already subscribed");
        }

        unit.Repository<BlogSubscription>().Add(blogSubscription);

        if (!await unit.Complete())
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Failed to subscribe to blog");
        }

        var result = await emailService.SendSubscriptionConfirmation(blogSubscription.Email);

        if (!result)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Failed to send email");
        }

        return Ok("Subscribed to blog");
    }

    [HttpDelete("unsubscribe/{email}")]
    public async Task<ActionResult> Unsubscribe(string email)
    {
        var spec = new BlogSubscriptionSpecification(Uri.UnescapeDataString(email));

        var subscriber = await unit.Repository<BlogSubscription>().FindAsync(spec);

        if (subscriber == null)
        {
            return StatusCode(StatusCodes.Status404NotFound, "Email not found");
        } 

        unit.Repository<BlogSubscription>().Remove(subscriber);

        if (!await unit.Complete())
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Failed to unsubscribe from blog");
        }

        return Ok("Unsubscribed from blog");
    }
}
