import { tagsArray } from "../constant/constant";

export const statusOptions = ["On Going", "Started", "Default", "In Review", "Completed"].map((item) => ({
    value: item,
    label: item,
}));

export const tagsOptions = tagsArray.map((item) => ({
    value: item,
    label: item,
}));

export const propertyOptions = ["Default", "High", "Medium", "Low"].map((item) => ({
    value: item,
    label: item,
}));

export const clientsArray = [
    "client Two",
    "Client One",
    "saifullah muhammad",
    "Nithin Viswanathan",
    "Kellan Ashford",
    "Johnathan Doe",
    "Shiva Prasad",
    "Dhananjay User",
    "Sanjay Soni",
    "Diego Mau",
    "hgfh hfh",
    "Md Aynal Haque",
    "test vpn",
    "Blaine Kane",
    "GAF CLIENT CLIENT",
    "test test",
    "Mahmoud Galal",
    "Michael Lion",
    "CLIENT AADDED",
    "Alice Johnson",
    "Robert Smith",
    "Emily Clark",
    "Lucas Green",
    "Sophia Williams",
    "Chris Martinez",
    "David Harris",
    "Jessica Lee",
    "Ethan Davis",
    "Lily Walker",
    "Olivia Brown",
    "Mason Moore",
    "Aiden Wright",
    "Isabella Hall",
    "Jacob White",
    "Mia Thompson",
    "Amelia King",
    "Benjamin Scott",
    "Emma Wilson",
    "William Adams"
  ]
  

  const projects = [
    "EcoMarket",
    "Project Planning for AI and ML",
    "UI Design for the Restaurant App",
    "Uber Web App Clone",
    "sdfsdfsdfsdf",
    "Project 1",
    "ZCV",
    "ruryturtu",
    "Deeni Kutub",
    "Image to Text",
    "Shopify Changes",
    "NOVEMBER 2023",
    "ruryturtu",
    "Flytt",
    "test",
    "Flutter",
    "demo",
    "Develope",
    "E-commerce Platform",
    "Mobile App Redesign",
    "Data Analytics Dashboard",
    "CRM System Integration",
    "Customer Feedback App",
    "Inventory Management System",
    "Website Optimization",
    "Social Media App",
    "Real Estate Portal",
    "Online Learning Platform",
    "Travel Booking App",
    "Fitness Tracker",
    "Digital Marketing Campaign",
    "Healthcare App",
    "AI Chatbot Development",
    "Subscription Service App",
    "Event Management System",
    "Food Delivery Service",
    "Virtual Reality Experience",
    "Blockchain Application"
  ]
  
  export const ContractType = [
    "Default",
    "Test from create contract",
    "Test from update contract",
    "test",
    "Design 장역ㄹㄹ",
    "Yeh",
    "hi",
    "hello",
    "Vendor",
    "Website",
    "testing",
    "k",
    "Show price",
    "2024-05-22",
    "demo testing new",
    "Digital Marketing SEO Contract",
    "Consulting Agreement",
    "Service Level Agreement",
    "Non-Disclosure Agreement",
    "Partnership Agreement",
    "Freelance Contract",
    "Employment Contract",
    "Sales Agreement",
    "Purchase Order",
    "Rental Agreement",
    "Licensing Agreement",
    "Project Agreement",
    "Terms and Conditions",
    "Privacy Policy",
    "Subscription Agreement",
    "Marketing Agreement",
    "Affiliate Agreement",
    "Joint Venture Agreement",
    "Independent Contractor Agreement",
    "Settlement Agreement"
  ]
  


 export const clientOptions = clientsArray.map((item) => ({
    value: item,
    label: item,
}));

 export const projectsOptions = projects.map((item) => ({
    value: item,
    label: item,
}));

 export const contentTypeOptions = ContractType.map((item) => ({
    value: item,
    label: item,
}));

 export const contentStatusOptions = ["properly signed", "signed"].map((item) => ({
    value: item,
    label: item,
}));