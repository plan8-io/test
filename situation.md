## Story

Popeye, a sailor man, has now made up his mind to do a startup with branch Anchor Inc along with his partner in business Olive Oyl. They are planning to get into the Boat Rental business. Anyone who is looking to rent a boat of their own for a holiday is a perfect customer for Anchor Inc.

As a small business, they chose to use simple [Airtable](https://airtable.com/templates/professional/expvjTzYAZareV1pt/sales-crm) to manage customer relationships. For example, Popeye and Olive simply add columns like priority, boat model, lead, customer, or churn etc to have contextual information about a customer. Olive Oyl updates information as needed.

On the other hand, Popeye chose to use [Freshdesk](https://freshdesk.com/) to have conversations with customers while having contextual information about a particular customer from Airtable.

### Problem

As Popeye uses Freshdesk. Every now and then, someone new raises a ticket on Freshdesk for an inquiry. As Popeye tries to support customers, he also does the manual task of adding a new row in the Airtable so that Olive can reach out to these “new emails” at a later point of time to see if they could become new customers.

Is there a way to automate this process?

### Aid

Anchor Inc needs help from a smart team like yours to build an automation solution. It is completely possible to build an app that runs on Freshworks Developer Platform that can handle this. The App should be able to accomplish the following tasks:

- The app should be a custom app that is going to run inside of a Freshdesk instance.
- App should be built using Freshworks Developer Platform
- As soon as a new requester ticket is created:
  - Apps create a new row in Airtable if a ticket is created by a new requester - Email Address
  - If the requester's email address is already existing, there is no need to create a new row.
- The App should follow [Coding Guidelines](https://developers.freshservice.com/docs/code-review-guidelines/).

### Bonus:

Apps can fetch and display the information of that particular requester inside of Freshdesk using a good choice of app placeholder.

### Setup

- Freshdesk
  - Create a Freshdesk account
- Airtable
  - [Sign up](https://airtable.com/invite/r/orBMZQ43) for a Airtable account
  - [Accept invitation](https://airtable.com/invite/l?inviteId=invg8hjkB57EEM6Ey&inviteToken=2f8a892240e6028780a54e02b08a8213c39de01e49e9c5a6b3034e7004d88c21) to join Anchor Inc’s shipping data which comes with edit access. For now it should be empty.
  - You should now be able to access [Anchor Inc airtable’s API documentation](https://airtable.com/appSDdLn0nvoTcSvt/api/docs#curl/introduction).

### A novice’s action plan

Though some details are deliberately left out and we leave it to the developers imagination. This plan below can be helpful for you to get a picture of the action plan.

1. App can have a configuration page that can capture API keys of Freshservice or Anchor Inc Airtable account as needed.
2. App mainly has serverless components. But if you aim for the bonus section in Aid, then you’ll need frontend.
3. Frontend

- You can use Crayons to build a UI that will display the information about current ticket requester.

4. Serverless

- App can observe ‘onTicketCreate’ events and capture the email address.
- App can use Data Storage on platform to remember if email address is already synced to Airtable or make an GET call to Anchor Inc’s Airtable.
- POST it to Anchor Inc’s API to create a record.

5. Upload it as a custom app.

### Submission

1. Accept invitation (as shared over email) to form a group and work on the assessment.

- You will be directed to a page to accept the invitation.
- Once invitation is accepted, you will either have an option to join a team or create your own team. Each team can have a maximum of 3 members.

2. As soon as Deadline is approached, you cannot push any more commits to the repository you own.
3. We recommend that you clone this repository to your local environment and work on this app.
4. After you have completed building the app please reply over the email to acknowledge Freshworks developer partner recruiment team.

### Help

1. Feel free to create/search a [topic](https://community.developers.freshworks.com/) on the forum for help.
2. You are required to have a Github account and working knowledge on Github.
3. [Install Freshworks CLI](https://community.developers.freshworks.com/t/what-are-the-prerequisites-to-install-the-freshworks-cli/234) and if needed work with [debug mode](https://community.developers.freshworks.com/t/how-to-obtain-debug-logs-from-fdk-enabling-debug-mode/629).

> Project submission will be [evaluated as the same as](https://community.developers.freshworks.com/t/app-review-process-to-list-app-on-freshworks-marketplace/1290) it is done for a public app that’s going to go live in Freshworks Marketplace.
