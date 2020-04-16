using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using TrivialGame.Models.TrivialGameSystemContextModels;
using Microsoft.AspNetCore.Identity;
using TrivialGame.Data;

namespace TrivialGame.Controllers
{

    public class QuestionInputController : Controller
    {
        private TrivialGameContext trivialGameContext;
        private UserManager<ApplicationUser> userManager;
        public QuestionInputController(TrivialGameContext _trivialGameContext, UserManager<ApplicationUser> _userManager)
        {
            trivialGameContext = _trivialGameContext;

            userManager = _userManager;
        }
        // GET: QuestionInput
        public ActionResult Index()
        {
            return View();
        }

        // GET: QuestionInput/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }
        // GET: QuestionInput/GetQuestions
        public JsonResult GetQuestions()
        {
            var userId = userManager.GetUserId(User);
            var question = trivialGameContext.Question.Where(q => q.UserId == userId).Include(q => q.QuestionMcanswer).Include(x => x.QuestionTag).Select(q =>
                  new
                  {
                      qId = q.Id,
                      qTag = q.QuestionTag.Select(t => new {tId = t.Id, tName = t.Tag.QtagName }),
                      qText = q.QuestionValue,
                      qAns = q.QuestionAnswer,
                      qMC = (q.QuestionType == 1) ? null : q.QuestionMcanswer.Select(qmc => new { mcId= qmc.Id,mcOps = qmc.Options, mcCor = qmc.Correct})
                  }).ToList();
            return Json(question);
        }

        // GET: QuestionInput/GetQuestions
        public JsonResult GetTags()
        {
            var userId = userManager.GetUserId(User);
            //var question = trivialGameContext.Question.Where(q => q.UserId == userId).Include(q => q.QuestionMcanswer).Include(x => x.QuestionTag).Select(q =>
            //      new
            //      {
            //          qId = q.Id,
            //          qTag = q.QuestionTag.Select(t => new { tId = t.Id, tName = t.Tag.QtagName }),
            //          qText = q.QuestionValue,
            //          qAns = q.QuestionAnswer,
            //          qMC = (q.QuestionType == 1) ? null : q.QuestionMcanswer.Select(qmc => new { mcId = qmc.Id, mcOps = qmc.Options, mcCor = qmc.Correct })
            //      }).ToList();
            var tags = trivialGameContext.Tag.ToList();
            return Json(tags);
        }
        // GET: QuestionInput/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: QuestionInput/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: QuestionInput/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: QuestionInput/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: QuestionInput/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: QuestionInput/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}