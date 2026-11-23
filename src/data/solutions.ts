export type Solution = {
  title: string
  problem: string
  does: string
  benefit: string
  inquiry: string
}

export const SOLUTIONS: Solution[] = [
  {
    title: 'AI Voice Receptionist',
    problem: 'Calls arrive when the team is busy, and common questions take the same explanation every time.',
    does: 'It answers incoming calls, handles common questions, and takes appointment requests.',
    benefit: 'Callers get a response, and the team receives the requests instead of a missed-call list.',
    inquiry: 'voice-agent',
  },
  {
    title: 'WhatsApp AI Assistant',
    problem: 'Customer conversations on WhatsApp pile up with repeat questions and unqualified inquiries.',
    does: 'It supports customer conversations, answers routine questions, and qualifies inquiries.',
    benefit: 'Routine chats are handled in the thread, and the team sees which inquiries are ready to follow up.',
    inquiry: 'whatsapp-agent',
  },
  {
    title: 'AI Lead Generation System',
    problem: 'Potential customers are scattered across inboxes, forms, and lists, with no shared next step.',
    does: 'It helps discover, qualify, organize, and route potential customer leads.',
    benefit: 'New inquiries land in one place with enough context for a person to decide what happens next.',
    inquiry: 'ai-agents',
  },
  {
    title: 'Automated CRM',
    problem: 'Customer details, sales notes, and follow-ups live in separate spreadsheets and inboxes.',
    does: 'It centralizes customer information, sales activity, reminders, and follow-ups.',
    benefit: 'The team can see the relationship and the next action without reconstructing it from old messages.',
    inquiry: 'crm',
  },
  {
    title: 'Custom ERP System',
    problem: 'Inventory, billing, HR, and reporting each have their own records and do not stay in step.',
    does: 'It connects operational functions such as inventory, billing, HR, and reporting.',
    benefit: 'Departments work from the same operational picture instead of reconciling exports later.',
    inquiry: 'erp',
  },
  {
    title: 'AI Customer Support',
    problem: 'Support repeats answers that already exist in documents, while unusual cases still need a person.',
    does: 'It uses approved business knowledge to support routine inquiries and escalation workflows.',
    benefit: 'Common questions are answered from material you approve, and everything else can be handed to the team.',
    inquiry: 'sales-support-agent',
  },
  {
    title: 'Business Automation',
    problem: 'The same data is copied between tools for notifications, updates, and reports.',
    does: 'It connects tools and reduces repetitive data entry, notifications, and reporting tasks.',
    benefit: 'A defined workflow moves the information, and people step in where a decision is needed.',
    inquiry: 'automation',
  },
  {
    title: 'Custom SaaS Platform',
    problem: 'A service idea still depends on manual accounts, spreadsheets, and one-off requests.',
    does: 'It turns a business idea into a software product with accounts, permissions, subscriptions, and administration.',
    benefit: 'Customers can sign in and use the product, and you can manage access and billing from an admin side.',
    inquiry: 'saas-product',
  },
]
