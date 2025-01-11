 // Convierte el componente en cliente
import FormTasks from "./components/FormTasks";
import ListTasks from "./components/ListTasks";


function HomePage() {
  return(
    <div className="container mx-auto p-4">
      <h1>Home Page</h1>
      <div className="flex gap-x-10">
      <FormTasks/>

      <ListTasks />
      </div>
     
    </div>
  )
}
export default HomePage;