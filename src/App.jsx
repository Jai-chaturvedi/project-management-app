import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState,setProjectState]=useState({
      selectedProjectID : undefined,
      projects :[],
      tasks : []
  });

  function handleAddTask(text){
    setProjectState(prevState=>{
      const newTask = {
         text : text,
        id : Math.random(),
        projectID : prevState.selectedProjectID
      }
         return {
             ...prevState,
             tasks : [newTask,...prevState.tasks]
         }
    })
  }
  function handleDeleteTask(id){
    setProjectState(prevState=>{
      return {
          ...prevState,
          tasks : prevState.tasks.filter((task)=>(
              task.id!==id
          ))
      }
 });
  }

  function handleSelectProject(id){
    setProjectState(prevState=>{
      return {
          ...prevState,
          selectedProjectID : id
      }
 });
  }

  function handleDeleteProject(){ 
    setProjectState(prevState=>{
      return {
          ...prevState,
          selectedProjectID : undefined,
          projects :prevState.projects.filter((project)=>(
              project.id!==prevState.selectedProjectID
          ))
      }
 });
  }
  function handleStartAddProject(){
    setProjectState(prevState=>{
         return {
             ...prevState,
             selectedProjectID : null
         }
    });
  }
  function handleCancelAddProject(){
    setProjectState(prevState=>{
      return {
          ...prevState,
          selectedProjectID : undefined
      }
 });
  }
  function handleAddProject(projectData){
    
            setProjectState(prevState=>{
              const newProjectData = {
                ...projectData,
                id : Math.random()
  
              }
                 return {
                     ...prevState,
                     projects : [...prevState.projects,newProjectData],
                     selectedProjectID : undefined
                 }
            })
  }
 // console.log(projectState.projects);
 const selectedProject = projectState.projects.find(project=> project.id===projectState.selectedProjectID);

  let content =<SelectedProject project={selectedProject} onDelete={handleDeleteProject}
  onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks}/>;
  if(projectState.selectedProjectID===null){
    content = <NewProject onAdd ={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectID===undefined){
     content =  <NoProjectSelected onAddProject={handleStartAddProject}/>
  }

  return (
    <main className = "h-screen my-8 flex gap-8">
      <ProjectsSideBar 
      onAddProject={handleStartAddProject} 
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectID={projectState.selectedProjectID}
      />
      {content}
    </main>
  );
}

export default App;
