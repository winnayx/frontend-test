# Blue Onion Labs Take Home Test

Hey! We are stoked that you are interested in joining the team at Blue Onion Labs.

We have crafted the following test (This app has been setup with the default create-react-app with a base typescript template) that is not meant to take too much of your time. The general goal is that we'd like to see how you approach designing a page, starting with some tabular data.

This take home test is used to determine how you go about laying out elements on a page. The test is very open to interpretation, and there are not many strict requirements. Feel free to take as much liberty to spice up the page, as you wish!

### What is the task?

The task is to display the data from the file fixtures/table_data.json and put it on the page in a table, with a few features included. The schema for the table_data.json looks something like:

``` JSON
{
    "id": "poztukparedfatugeuhoturholaneh",
    "object": "charge",
    "amount": 184303,
    "amount_refunded": 0,
    "application_fee_amount": 11100,
    "balance_transaction": "bunooduseadaramepanravhipatpebkoicrashov",
    "billing_details": {
        "address": {
            "city": "Ojualumab",
            "country": "Israel",
            "postal_code": "78136"
        }
    },
    "calculated_statement_descriptor": null,
    "captured": true,
    "created": 1599241104,
    "currency": "usd",
    "customer": null,
    "description": "zizusanzoulapigapohe",
    "refunded": false,
    "sources": [{
        "id": "accc407d-ec27-5303-95dc-fc024e2dea7a",
        "object": "account"
    }],
    "status": "succeeded"
}
```

### Requirements
*You do not have to use precise typescript syntax. Feel free to use normal javascript if that is what you are most comfortable with*

- As a user, I can see the data in a table. (This the primary piece of the exercise)
- As a user, I can sort data in a particular column (a component library would be helpful here)
- As a user, I can filter results according to the 'created' column (This will require creating a date range filter)

Note a few things:
- The created field is a UNIX timestamp
- The billing details is a nested structure, but is not an array
- The sources field is an array. Is there a good way to put this into the table? If not, how would you go about laying out the page differently to display this 1-to-many data?

### Extra Credit!?

- Put together a good looking layout for the page

### Some Helpful Component Libraries

[Material UI](https://material-ui.com/)

[Ant Design](https://github.com/ant-design/ant-design)

### Getting Started

You will have to run `npm install` or `yarn` inside the directory to install required modules.

You can use any libraries that you want that will help. (Component libraries, charting libs, anything at all!)

It serves out the public/index.html file and the entrypoint for the react app is at App.tsx. If you do not need the dev server, or wish to change it, feel free to do so! You can run `npm start` or `yarn start` to run the project

### How to Submit

1. Run through it one last time to make sure it works!
2. Push up to your forked repo one last time (or save your working directory to a 'zip')
3. Reach out to us with your solution

### Questions

If you have any questions at all during the challenge do not hesitate to reach out! Whether it be a question about the requirements, submitting, anything, just send us a note!
