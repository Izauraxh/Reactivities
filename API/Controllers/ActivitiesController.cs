using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseApiController
    {

        /// <summary>
        /// Gets all activities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetActivities([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params=param}));
        }
        /// <summary>
        /// Get an activity with id 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        /// <summary>
        /// Creates a new activity
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateAcitivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }
        /// <summary>
        /// Update an activity
        /// </summary>
        /// <param name="id"></param>
        /// <param name="activity"></param>
        /// <returns></returns>
        [Authorize(Policy= "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }
        /// <summary>
        /// Delete an activity
        /// </summary>
        /// <param name="id">Id of activity</param>
        /// <returns></returns>
        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        /// <summary>
        /// Update Attendance
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }

    }
}
