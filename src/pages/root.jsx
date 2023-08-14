import {Routes, Route, useNavigate} from 'react-router-dom'
import NotFound from "../components/notFound/NotFound";
import Dashboard from "../components/biocontrol/Dashboard";
import Employees from "../components/biocontrol/Employees";
import WorkingTimeTable from "../components/biocontrol/WorkingTimeTable";
import Orders from "../components/biocontrol/Orders";
import Settings from "../components/biocontrol/Settings";


const RootPage = () => {

    return (<Routes>
        <Route path='*' element={<Dashboard/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/working-time-table' element={<WorkingTimeTable/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/settings' element={<Settings/>}/>


        <Route path='*' element={<NotFound/>}/>
    </Routes>)
}

export default RootPage;
