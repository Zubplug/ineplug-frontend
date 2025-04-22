// Updated App.jsx with AddressVerification route removed
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserProtectedRoute from "./components/UserProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import PartnerProtectedRoute from "./components/PartnerProtectedRoute";
import AggregatorProtectedRoute from "./components/AggregatorProtectedRoute";

import RegisterScreen from "./pages/Auth/RegisterScreen";
import CreatePinScreen from "./pages/Auth/CreatePinScreen";
import Login from "./pages/Auth/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import PartnerLogin from "./pages/Partner/PartnerLogin";
import PartnerRegister from "./pages/Partner/PartnerRegister";
import AggregatorLogin from "./pages/aggregator/AggregatorLogin";
import AggregatorRegister from "./pages/aggregator/AggregatorRegister";
import AccountLimitPage from "./pages/AccountLimitPage";

import UserDashboard from "./pages/UserDashboard";
import Transactions from "./pages/Transactions";
import ReceiptView from "./pages/ReceiptView";
import SettingsPage from "./pages/SettingsPage";

import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import Users from "./pages/admin/Users";
import AdminTicketsPage from "./pages/admin/AdminTicketsPage";
import AdminPartnerStaffPage from "./pages/admin/AdminPartnerStaffPage";
import AdminTransactionsPage from "./pages/admin/AdminTransactionsPage";
import AdminAggregatorPageFinal from "./pages/admin/AdminAggregatorPageFinal";
import AdminRequestReviewPage from "./pages/admin/AdminRequestReviewPage";
import AdminServicesPage from "./pages/admin/AdminServicesPage";
import EditFormPage from "./pages/admin/EditFormPage";
import AdminServiceRequests from "./pages/admin/AdminServiceRequests";
import AdminUserRequests from "./pages/admin/AdminUserRequests";
import AdminKycComplianceDashboard from "./pages/admin/AdminKycComplianceDashboard";

import PartnerStaffDashboard from "./pages/partner/PartnerStaffDashboard";
import PartnerJobFeed from "./pages/Partner/JobFeed";
import PartnerAssignedRequestsPage from "./pages/partner/PartnerAssignedRequestsPage";
import ClaimJobs from "./pages/partner/ClaimJobs";

import AggregatorDashboard from "./pages/aggregator/AggregatorDashboard";

import CACServices from "./pages/Services/CACServices";
import ComplianceServices from "./pages/Services/ComplianceServices";
import FoodServices from "./pages/Services/FoodServices";
import NIMCServices from "./pages/Services/NIMCServices";
import BankingServices from "./pages/Services/BankingServices";
import BVNServices from "./pages/Services/BVNServices";
import VTUTypeScreen from "./pages/Services/VTUTypeScreen";
import AirtimeScreen from "./pages/Services/VTU/AirtimeScreen";
import DataScreen from "./pages/Services/VTU/DataScreen";
import ElectricityScreen from "./pages/Services/VTU/ElectricityScreen";
import EducationScreen from "./pages/Services/VTU/EducationScreen";
import BettingScreen from "./pages/Services/VTU/BettingScreen";
import CableScreen from "./pages/Services/VTU/CableScreen";
import GeneralServices from "./pages/Services/GeneralServices";
import ManualFormPage from "./pages/Services/ManualFormPage";
import DynamicFormPage from "./pages/services/DynamicFormPage";
import InsuranceScreen from "./pages/Services/VTU/InsuranceScreen";
import VtuServicesManager from "./pages/admin/VtuServicesManager";

import BankTransferForm from "./pages/Transfer/BankTransferForm";
import EnterTransferPIN from "./pages/Transfer/EnterTransferPIN";
import TransferSuccess from "./pages/Transfer/TransferSuccess";
import TransferFailure from "./pages/Transfer/TransferFailure";
import IneplugTransfer from "./pages/Transfer/IneplugTransfer";

import LandingHome from "./pages/LandingHome";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingHome />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/create-pin" element={<CreatePinScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/partner/register" element={<PartnerRegister />} />
        <Route path="/aggregator/login" element={<AggregatorLogin />} />
        <Route path="/aggregator/register" element={<AggregatorRegister />} />
        <Route path="/admin/vtu-services" element={<VtuServicesManager />} />
        <Route path="/account-limit" element={<UserProtectedRoute><AccountLimitPage /></UserProtectedRoute>} />


        {/* User */}
        <Route path="/dashboard" element={<UserProtectedRoute><UserDashboard /></UserProtectedRoute>} />
        <Route path="/transactions" element={<UserProtectedRoute><Transactions /></UserProtectedRoute>} />
        <Route path="/receipt/:id" element={<UserProtectedRoute><ReceiptView /></UserProtectedRoute>} />
        <Route path="/settings" element={<UserProtectedRoute><SettingsPage /></UserProtectedRoute>} />
        <Route path="/bank-transfer" element={<UserProtectedRoute><BankTransferForm /></UserProtectedRoute>} />
        <Route path="/enter-transfer-pin" element={<UserProtectedRoute><EnterTransferPIN /></UserProtectedRoute>} />
        <Route path="/transfer-success" element={<UserProtectedRoute><TransferSuccess /></UserProtectedRoute>} />
        <Route path="/transfer-failure" element={<UserProtectedRoute><TransferFailure /></UserProtectedRoute>} />
        <Route path="/ineplug-transfer" element={<UserProtectedRoute><IneplugTransfer /></UserProtectedRoute>} />

        {/* Services */}
        <Route path="/services/vtu" element={<UserProtectedRoute><VTUTypeScreen /></UserProtectedRoute>} />
        <Route path="/services/vtu/insurance" element={<InsuranceScreen />} />
        <Route path="/services/vtu/airtime" element={<UserProtectedRoute><AirtimeScreen /></UserProtectedRoute>} />
        <Route path="/services/vtu/data" element={<UserProtectedRoute><DataScreen /></UserProtectedRoute>} />
        <Route path="/services/vtu/electricity" element={<UserProtectedRoute><ElectricityScreen /></UserProtectedRoute>} />
        <Route path="/services/vtu/education" element={<UserProtectedRoute><EducationScreen /></UserProtectedRoute>} />
        <Route path="/services/vtu/betting" element={<UserProtectedRoute><BettingScreen /></UserProtectedRoute>} />
        <Route path="/services/vtu/cable" element={<UserProtectedRoute><CableScreen /></UserProtectedRoute>} />
        <Route path="/services/cac" element={<UserProtectedRoute><CACServices /></UserProtectedRoute>} />
        <Route path="/services/bvn" element={<UserProtectedRoute><BVNServices /></UserProtectedRoute>} />
        <Route path="/services/nimc" element={<UserProtectedRoute><NIMCServices /></UserProtectedRoute>} />
        <Route path="/services/food" element={<UserProtectedRoute><FoodServices /></UserProtectedRoute>} />
        <Route path="/services/banking" element={<UserProtectedRoute><BankingServices /></UserProtectedRoute>} />
        <Route path="/services/compliance" element={<UserProtectedRoute><ComplianceServices /></UserProtectedRoute>} />
        <Route path="/services/general" element={<UserProtectedRoute><GeneralServices /></UserProtectedRoute>} />
        <Route path="/services/manual/:slug" element={<UserProtectedRoute><ManualFormPage /></UserProtectedRoute>} />
        <Route path="/services/dynamic/:slug" element={<UserProtectedRoute><DynamicFormPage /></UserProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
        <Route path="/admin/settings" element={<AdminProtectedRoute><Settings /></AdminProtectedRoute>} />
        <Route path="/admin/users" element={<AdminProtectedRoute><Users /></AdminProtectedRoute>} />
        <Route path="/admin/tickets" element={<AdminProtectedRoute><AdminTicketsPage /></AdminProtectedRoute>} />
        <Route path="/admin/partners" element={<AdminProtectedRoute><AdminPartnerStaffPage /></AdminProtectedRoute>} />
        <Route path="/admin/transactions" element={<AdminProtectedRoute><AdminTransactionsPage /></AdminProtectedRoute>} />
        <Route path="/admin/aggregators" element={<AdminProtectedRoute><AdminAggregatorPageFinal /></AdminProtectedRoute>} />
        <Route path="/admin/requests/review" element={<AdminProtectedRoute><AdminRequestReviewPage /></AdminProtectedRoute>} />
        <Route path="/admin/services" element={<AdminProtectedRoute><AdminServicesPage /></AdminProtectedRoute>} />
        <Route path="/admin/forms/edit/:slug" element={<AdminProtectedRoute><EditFormPage /></AdminProtectedRoute>} />
        <Route path="/admin/requests" element={<AdminProtectedRoute><AdminUserRequests /></AdminProtectedRoute>} />
        <Route path="/admin/user-requests" element={<AdminProtectedRoute><AdminUserRequests /></AdminProtectedRoute>} />
        <Route path="/admin/service-requests" element={<AdminProtectedRoute><AdminServiceRequests /></AdminProtectedRoute>} />
        <Route path="/admin/kyc-compliance" element={<AdminProtectedRoute><AdminKycComplianceDashboard /></AdminProtectedRoute>} />

        {/* Partner */}
        <Route path="/partner/dashboard" element={<PartnerProtectedRoute><PartnerStaffDashboard /></PartnerProtectedRoute>} />
        <Route path="/partner/job-feed" element={<PartnerProtectedRoute><PartnerJobFeed /></PartnerProtectedRoute>} />
        <Route path="/partner/assigned-jobs" element={<PartnerProtectedRoute><PartnerAssignedRequestsPage /></PartnerProtectedRoute>} />
        <Route path="/partner/claim-jobs" element={<PartnerProtectedRoute><ClaimJobs /></PartnerProtectedRoute>} />

        {/* Aggregators */}
        <Route path="/aggregator/dashboard" element={<AggregatorProtectedRoute><AggregatorDashboard /></AggregatorProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<div className="p-10 text-center">Page Not Found</div>} />
      </Routes>
    </Router>
  );
}
