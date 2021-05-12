const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();
    let statusCounts = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };
    //total de horas por dia de cada job em progresso
    let jobTotalHours = 0;
    const updatedJobs = jobs.map((job) => {
      //ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      //Somando +1 à quantidade de statusCounts a cada job do Array que passa pelo map
      statusCounts[status] += 1; // calcula statusCounts de cada tipo progress e done

      //total de horas por dia de cada job em progresso
      jobTotalHours =
        status === "progress"
          ? jobTotalHours + Number(job["daily-hours"])
          : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    //qtd de horas que quero trabalhar dia (profile)
    //Menos
    //a qtd de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile,
      statusCounts: statusCounts,
      freeHours: freeHours,
    });
  },
};
