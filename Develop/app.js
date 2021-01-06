const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];

//Manager Questions 
const manegerQuestions = () => {
    inquirer
      .prompt([
        {
          name: "managerName",
          type: "input",
          message: "What is your name ? ",
        },
        {
            name: "managerId",
            type: "input",
            message: "What is your ID ? ",
          },
          {
            name: "managerEmail",
            type: "input",
            message: "what is your Email Address ? ",
          },
          {
            name: "managerOffice",
            type: "number",
            message: "What is your office number ?"
          },
          {
            name: "hasTeam",
            type: "confirm",
            message: "Do you have any team member ?"
          },  
      ])
      .then((res) => {
          const manager = new Manager(res.managerId, res.managerName, res.managerEmail, res.managerOffice);
          employees.push(manager);
          if(res.hasTeam){
            employeeRole()
          }else{
              fs.writeFile(outputPath, render(employees), (err) => { 
                if (err) 
                  console.log(err); 
                else { 
                  console.log("File written successfully\n"); 
                  console.log("The written has the following contents:"); 
                } 
              } ); 
              return;
          }
      });  
      
  };

  // employee role
  const employeeRole = ()=>{
      inquirer
      .prompt([
    {
        name: "role",
        type: "list",
        message: "what is employee role in the compony ? ",
        choices: ['Engineer','Intern']
      }, 
     ]).then((res)=>{
    res.role === "Engineer"? engineer(): intern()
     })
      }

  // engineer question
    const engineer = ()=>{
        inquirer
        .prompt([ {
            name: "engineerName",
            type: "input",
            message: "what is engineer name ? ",
          },
          {
              name: "engineerId",
              type: "input",
              message: "what is engineer ID ? ",
            },
            {
              name: "engineerEmail",
              type: "input",
              message: "what is engineer Email ? ",
            },
            {
                name: "engineerGithub",
                type: "input",
                message: "what is engineer github account ? ",
              },
         ] ).then(res=>{
             const engineer = new Engineer (res.engineerId, res.engineerName,res.engineerEmail,res.engineerGithub)
             employees.push(engineer)
             newMember()

         })
       

    }

    // intern question
    
    const intern = ()=>{
        inquirer
        .prompt([{
            name: "internName",
            type: "input",
            message: "what is intern name ? ",
            },
            {
              name: "internId",
              type: "input",
              message: "what is intern ID ? ",
            },
            {
            name: "internSchool",
            type: "input",
            message: "what is intern school ? "
        },
        {
            name: "internEmail",
            type: "input",
            message: "what is intern email ? ",
          },

    ]).then(res =>{
        const intern = new Intern (res.internId, res.internName,res.internEmail,res.internSchool)
        employees.push(intern)
        newMember()
    })
    }
    // asking manager if he has new members
    function newMember(){
        inquirer
        .prompt([
            {
                name: "hasNewTeam",
                type: "confirm",
                message: "Would you like to add any new member?"
              
        }]).then(res=>{
            res.hasNewTeam ? confirmNewTeam():
             fs.writeFile(outputPath,render(employees), (err) => { 
                if (err) 
                  console.log(err); 
                else { 
                  console.log("File written successfully\n"); 
                  console.log("The written has the following contents:"); 
                  
                } 
              } );  
        })
    }

    // asking manager if he want to add new team member 
    const confirmNewTeam = ()=>{
        inquirer
        .prompt([
      {
          name: "role",
          type: "list",
          message: "what is employee role in the compony ? ",
          choices: ['Engineer','Intern']
        }, 
       ]).then((res)=>{
      res.role === "Engineer"? engineer(): intern()
       })
        }
    manegerQuestions() 
    
      



  
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
