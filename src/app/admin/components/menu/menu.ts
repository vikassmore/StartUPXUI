import { Menu } from './menu.model'; 



export const menuItems = [  
       
       
       //Admin Menu Start//

       new Menu (10, 'Dashboard', '/admin/dashboard-menu/dash-board', null, 'laptop', null, false, 0), 
       new Menu (11, 'Masters', null, null, 'camera_enhance', null, true, 0),
       // new Menu (12, 'Services', '/admin/masters/listservice', null, 'list_alt', null, false, 11),
       // new Menu (13, 'Add Service', '/admin/masters/addservice', null, 'add_circle_outline', null, false, 12),
       // new Menu (14, 'Service List', '/admin/masters/listservice', null, 'list', null, false, 12),
       new Menu (15, 'Sectors', '/admin/masters/listsector', null, 'list_alt', null, false, 11),
       // new Menu (16, 'Add Sector', '/admin/masters/addsector', null, 'add_circle_outline', null, false, 15),
       // new Menu (17, 'Sector List', '/admin/masters/listsector', null, 'list', null, false, 15),
       new Menu (18, 'Funding', '/admin/masters/listfunding', null, 'list_alt', null, false, 11),
       // new Menu (19, 'Add Funding', '/admin/masters/addfunding', null, 'add_circle_outline', null, false, 18),
       // new Menu (20, 'Funding List', '/admin/masters/listfunding', null, 'list', null, false, 18),
        new Menu (21, 'Category', '/admin/masters/listcategory', null, 'list_alt', null, false, 11),
       //  new Menu (22, 'Add Investment Category', '/admin/masters/addinvestmentcategory', null, 'add_circle_outline', null, false, 21),
       //  new Menu (23, 'Investment Category List', '/admin/masters/listinvestmentcategory', null, 'list', null, false, 21),
       // new Menu (24, 'Startup Category', 'null', null, 'list_alt', null, true, 11),
       // new Menu (25, 'Add Startup Category', '/admin/masters/addstartupcategory', null, 'add_circle_outline', null, false, 24),
       // new Menu (26, 'Startup Category List', '/admin/masters/liststartupcategory', null, 'list', null, false, 24),
       new Menu (39, 'Accredited Investor', '/admin/masters/listaccreditedinvestor', null, 'list_alt', null, false, 11),
       new Menu (27, 'FAQ', '/admin/masters/listfaq', null, 'list_alt', null, false, 11),
       // new Menu (28, 'Add FAQ', '/admin/masters/addfaq', null, 'add_circle_outline', null, false, 27),
       // new Menu (29, 'FAQ List', '/admin/masters/listfaq', null, 'list', null, false, 27),
       new Menu (38, 'Policies', '/admin/masters/listpolicy', null, 'list_alt', null, false, 11),
       // new Menu (39, 'Add Policy', '/admin/masters/addpolicy', null, 'add_circle_outline', null, false, 38),
       // new Menu (40, 'Policy List', '/admin/masters/listpolicy', null, 'list', null, false, 38),
       // new Menu (30, 'Companies', null, null, 'camera_enhance', null, true, 0),
       // new Menu (31, 'Company List', '/admin/masters/listcompany', null, 'list', null, false, 30),
       // new Menu (35, 'Profile', null, null, 'camera_enhance', null, true, 0),
       // new Menu (36, 'Edit Profile', '/admin/masters/editprofile', null, 'list', null, false, 35),
       new Menu (29, 'Notable Investor', '/admin/masters/listnotableinvestor', null, 'list_alt', null, false, 11),
       new Menu (40, 'Services', null, null, 'camera_enhance', null, true, 0),
       new Menu (41, 'Service Users', '/admin/masters/listserviceuser', null, 'list_alt', null, false, 40),
       // new Menu (42, 'Service Profile Management', '/admin/masters/listprofilemanagement', null, 'list_alt', null, false, 40),
       new Menu (43, 'Service Workflow Management', '/admin/masters/listworkflowmanagement', null, 'list_alt', null, false, 40),
       
       //Admin Menu End//
   
]

export const menuStartupItems = [ 
       
       //Startup Menu Start//
       
       new Menu (50, 'Dashboard', '/admin/startup/dashboardstartup', null, 'laptop', null, false, 0), 
       new Menu (51, 'Manage Profile', null, null, 'camera_enhance', null, true, 0),
       new Menu (52, 'Startup Details', '/admin/startup/startupdetails', null, 'list_alt', null, false, 51),
       new Menu (53, 'Founder Details', '/admin/startup/listfounderdetails', null, 'list_alt', null, false, 51),
       //new Menu (54, 'Company Details', '/admin/startup/companydetails', null, 'list_alt', null, false, 51),
       new Menu (55, 'Funding Details', '/admin/startup/fundingdetails', null, 'list_alt', null, false, 51),
       new Menu (56, 'Documents Details', '/admin/startup/documentdetails', null, 'list_alt', null, false, 51),

       new Menu (57, 'Services', '/admin/startup/listmyservice', null, 'list_alt', null, false, 0), 
       //Startup Menu End//


 
]

export const menuInvesterItems =[

       new Menu (50, 'Dashboard', '/admin/investor/dashboardinvestor', null, 'laptop', null, false, 0),
       new Menu (51, 'Manage Profile', null, null, 'camera_enhance', null, true, 0),
       new Menu (53, 'Profile Details', '/admin/investor/basicdetails', null, 'list_alt', null, false, 51),
       new Menu (54, 'Bank Account Details', '/admin/investor/bankdetails', null, 'list_alt', null, false, 51),
       new Menu (55, 'Trusted Contact Person', '/admin/investor/trustedcontact', null, 'list_alt', null, false, 51),
       new Menu (57, 'Suitability Questionnaire', '/admin/investor/questionnaire', null, 'list_alt', null, false, 51),
       new Menu (58, 'Investment Profile', '/admin/investor/investmentprofile', null, 'list_alt', null, false, 51),
       new Menu (74, 'My Documents', '/admin/investor/mydocuments', null, 'list_alt', null, false, 51),
       new Menu (70, 'Investment', null, null, 'camera_enhance', null, true, 0),
       new Menu (72, 'My Investments', '/admin/investor/myinvestment', null, 'list_alt', null, false, 70),
       new Menu (73, 'My Watchlist', '/admin/investor/mywatchlist', null, 'list_alt', null, false, 70),
       
       // new Menu (61, 'Manage Service', null, null, 'camera_enhance', null, true, 0),
       // new Menu (63, 'Service List', '/admin/investor/servicelist', null, 'list_alt', null, false, 61),
]


export const menuServiceUserItems = [  
       
       new Menu (80, 'Dashboard', '/admin/serviceuser/dashboardserviceuser', null, 'laptop', null, false, 0), 
       new Menu (81, 'Profile Management', '/admin/serviceuser/profilemanagement', null, 'list_alt',  null, false, 0), 
       new Menu (82, 'Service Leads', '/admin/serviceuser/serviceleads', null, 'list_alt',  null, false, 0), 
       new Menu (83, 'Assignment Workflows', '/admin/serviceuser/listassignmentworkflow', null, 'list_alt',  null, false, 0),
   
       
]

