using System;
using API.Controllers;
using API.Entities;
using API.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Data;

public class BlogController(UnitOfWork unit) : BaseApiController
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

        return BadRequest("Problem creating blog post");
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
}
