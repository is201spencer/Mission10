using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission10.Data;
using System.Collections.Generic;
using System.Linq;

namespace Mission10.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BowlerController : ControllerBase
    {
        private readonly BowlingLeagueContext _context;

        public BowlerController(BowlingLeagueContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBowler")]
        public IActionResult Get()
        {
            var bowlers = _context.Bowlers
                .Include(b => b.Team) // Join with Team table
                .Where(b => b.Team != null && (b.Team.TeamName == "Marlins" || b.Team.TeamName == "Sharks")) // Filter
                .Select(b => new
                {
                    BowlerId = b.BowlerId,
                    FullName = $"{b.BowlerFirstName} {b.BowlerMiddleInit} {b.BowlerLastName}".Trim(),
                    TeamName = b.Team.TeamName,
                    Address = b.BowlerAddress,
                    City = b.BowlerCity,
                    State = b.BowlerState,
                    Zip = b.BowlerZip,
                    PhoneNumber = b.BowlerPhoneNumber
                })
                .ToList();

            return Ok(bowlers);
        }
    }
}
