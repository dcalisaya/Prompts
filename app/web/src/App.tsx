import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import RoleList from './pages/Roles/RoleList';
import RoleDetail from './pages/Roles/RoleDetail';
import DisciplineList from './pages/Disciplines/DisciplineList';
import DisciplineDetail from './pages/Disciplines/DisciplineDetail';
import PromptList from './pages/Prompts/PromptList';
import PromptDetail from './pages/Prompts/PromptDetail';
import AgentList from './pages/Agents/AgentList';
import AgentDetail from './pages/Agents/AgentDetail';
import ServiceList from './pages/Services/ServiceList';
import ServiceDetail from './pages/Services/ServiceDetail';
import ManualList from './pages/Manuals/ManualList';
import ManualDetail from './pages/Manuals/ManualDetail';
import BriefPage from './pages/Briefs/BriefPage';
import FlowList from './pages/Flows/FlowList';
import FlowDetail from './pages/Flows/FlowDetail';
import SearchPage from './pages/Search/SearchPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          <Route path="roles" element={<RoleList />} />
          <Route path="roles/:slug" element={<RoleDetail />} />
          
          <Route path="disciplinas" element={<DisciplineList />} />
          <Route path="disciplinas/:id" element={<DisciplineDetail />} />
          
          <Route path="prompts" element={<PromptList />} />
          <Route path="prompts/:id" element={<PromptDetail />} />
          
          <Route path="brief/:promptId" element={<BriefPage />} />
          
          <Route path="agentes" element={<AgentList />} />
          <Route path="agentes/:name" element={<AgentDetail />} />
          
          <Route path="servicios" element={<ServiceList />} />
          <Route path="servicios/:code" element={<ServiceDetail />} />
          
          <Route path="manuales" element={<ManualList />} />
          <Route path="manuales/:id" element={<ManualDetail />} />
          
          <Route path="flujos" element={<FlowList />} />
          <Route path="flujos/:flowId" element={<FlowDetail />} />
          
          <Route path="buscar" element={<SearchPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
