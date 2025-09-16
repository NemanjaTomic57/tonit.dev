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
    [HttpPost("create-blog-post")]
    public async Task<ActionResult<BlogPost>> CreateBlogPost(BlogPost blogPost)
    {
        unit.Repository<BlogPost>().Add(blogPost);

        if (await unit.Complete())
        {
            return CreatedAtAction("GetBlogPost", new { slug = blogPost.Slug });
        }

        return BadRequest("Problem creating blog post");
    }

    [HttpGet("get-blog-post/{slug}")]
    public async Task<ActionResult<BlogPost>> GetBlogPost(string slug)
    {
        var spec = new BlogSpecification(slug);

        var blogPost = await unit.Repository<BlogPost>().FindAsync(spec);

        return Ok(blogPost);
    }
}
