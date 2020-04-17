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
using Newtonsoft.Json.Linq;
using TrivialGame.Models;

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
        public async Task<JsonResult> GetQuestions()
        {
            var userId = userManager.GetUserId(User);
            var question = await trivialGameContext.Question.Where(q => q.UserId == userId).Include(q => q.QuestionMcanswer).Include(x => x.QuestionTag).Include(q => q.QuestionTypeNavigation).Select(q =>
                  new
                  {
                      qId = q.Id,
                      qTag = q.QuestionTag.Select(t => new { tId = t.Id, tName = t.Tag.QtagName }),
                      qText = q.QuestionValue,
                      qAns = q.QuestionAnswer,
                      qType = q.QuestionTypeNavigation.QtypeName,
                      qTypeId = q.QuestionType,
                      qMC = (q.QuestionType == 1) ? null : q.QuestionMcanswer.Select(qmc => new { mcId = qmc.Id, mcOps = qmc.Options, mcCor = qmc.Correct })
                  }).ToListAsync();
            return Json(question);
        }

        // GET: QuestionInput/GetQuestions
        public async Task<JsonResult> GetTags()
        {
            var tags = await trivialGameContext.Tag.Select(x => new
            {
                value = x.Qtag,
                label = x.QtagName
            }).ToListAsync();
            return Json(tags);
        }

        public async Task<JsonResult> getTypes()
        {
            var qTypes = await trivialGameContext.Type.Select(x=>new {
            value = x.Qtype,
            label = x.QtypeName
            }).ToListAsync();
            return Json(qTypes);
        }
        // GET: QuestionInput/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: QuestionInput/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Create(string value)
        {
            AddQuestionModel myObject = JsonConvert.DeserializeObject<AddQuestionModel>(value);
            if (myObject == null)
            {
                return Json("Error");
            }
            var temp = "here";
            var questionType = myObject.selectedQType;
            var qObj = myObject.qObj;
            var mcList = myObject.mcList;
            var selectedTagList = myObject.selectedTagList;
            var here = "there";
            //dynamic myObject = JArray.Parse(value);
           
            try
            {
                Question question;
                var userId = userManager.GetUserId(User);
                //a String question
                if (questionType == 1)
                {
                    question = new Question();
                    question.UserId = userId;
                    //question.QuestionValue = qObj.qText;
                }
                // TODO: Add insert logic here

                return Json("success");
            }
            catch
            {
                return Json("Error");
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