# Wintermute

## The Why

I love cyberpunk. I love API design (really, I do) and I wanted to practice my NodeJS
skills. So what better way to bring these three things together than using expressJS to build an API of
famous cyberpunk novels, characters and authors ?

The goal was to make a cleanly designed API available to developers to test their
applications with. I am fully aware that there are a million of them out there already,
but let's be honest, they're quite boring.

# The What

Here's a quick list of wintermute's features:

- Support for GET, POST, PUT, PATCH and DELETE requests
- Built with the best practices of REST in mind
- Simple, clean and easy to understand API
- Support for HasMany relationships
- Uses PostgreSQL for the database
- No need to register
- Support for nested resources
- Compatible with the most popular JS frameworks
- Secured with SSL
- Graceful error handling

# The How

- Show how to get data using fetch (returns a count of all resources, and a url to the
  resource itself) returns a 204 no content if the collection is empty

- Show how to get resource by id (returns a URL to the nested collection)

- Show how to post a resource ( returns a location header with a link to the resource x
  201 status code) 409 conflict if unique constraint violation and 422 if missing fields

- Show how to update a resource ( returns a 200 with a message along with the resource)
  422 if you don't pass it the entire payload

- Show how to patch a resource (returns the resource and a 200)

- Show how to delete a resource (returns a 204 no content)

- Show how to get a nested resource

# The things to know about contributing

I will be more than happy to accept contributions to this project, especially if you can
teach me a trick of two about API design and security.

So feel free to initiate a PR and I will look into it :smile: (The only thing that I
require is that you give an explanation as to how your solution is better/improves
security etc)

# The things that remain to be done

- [ ] Implement CORS
- [ ] Implement rate limiting
- [ ] Implement pagination
- [ ] Add support for OPTIONS requests
- [ ] Create better (cleaner) tests
- [ ] Extract (when possible) controller logic to their own functions (to help with unit
  tests)

# The things I learned

- Express JS
- The Sequelize ORM
- How to create roles and manage a postgres installation
- How to dynamically set environment variables using the infamous `package.json` file
- How to merge and clone objects using `Object.assign`
- ES6 Destructuring of objects
- Compare equality of arrays


