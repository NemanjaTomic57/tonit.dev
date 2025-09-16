using System;
using API.Controllers;
using API.Entities;
using API.Services;
using API.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Data;

public class BlogController(UnitOfWork unit, EmailService emailService) : BaseApiController
{
    [Authorize]
    [HttpPost("create")]
    public async Task<ActionResult<BlogPost>> CreateBlogPost(BlogPost blogPost)
    {
        unit.Repository<BlogPost>().Add(blogPost);

        if (await unit.Complete())
        {
            return CreatedAtAction(nameof(GetBlogPost), new { slug = blogPost.Slug }, blogPost);
        }

        throw new BadHttpRequestException("Failed to create blog post", 500);
    }

    [HttpGet("get/{slug}")]
    public async Task<ActionResult<BlogPost>> GetBlogPost(string slug)
    {
        var spec = new BlogSpecification(slug);

        var blogPost = await unit.Repository<BlogPost>().FindAsync(spec);

        return Ok(blogPost);
    }

    [HttpGet("get-all")]
    public async Task<ActionResult<IReadOnlyList<BlogPost>>> GetAllBlogPosts()
    {
        var blogPosts = await unit.Repository<BlogPost>().ListAllAsync();

        return Ok(blogPosts);
    }

    [HttpPost("subscribe")]
    public async Task<ActionResult> Subscribe(BlogSubscription blogSubscription)
    {
        var spec = new BlogSubscriptionSpecification(blogSubscription.Email);
        var exists = await unit.Repository<BlogSubscription>().FindAsync(spec);

        if (exists != null)
        {
            throw new BadHttpRequestException("Email already subscribed", 400);
        }

        unit.Repository<BlogSubscription>().Add(blogSubscription);

        if (await unit.Complete())
        {

            return Ok("Subscribed to blog");
        }

        throw new BadHttpRequestException("Failed to subscribe to blog", 500);        
    }
}
