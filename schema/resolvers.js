const { UserList, MovieList } = require("../FakeData");

const resolvers = {
  Query: {
    // Users Resolvers
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = UserList.find((user) => user.id === Number(id));
      return user;
    },
    // Movies Resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = MovieList.find((movie) => movie.name === name);
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      const favoriteMovies = MovieList.filter(
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
      return favoriteMovies;
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    updateUserName: (parent, args) => {
      const { id, usernameUpdate } = args.input;

      let userUpdate;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = usernameUpdate;
          userUpdate = user;
        }
      });

      return userUpdate;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      const index = UserList.findIndex((user) => user.id === Number(id));

      if (index !== -1) {
        UserList.splice(index, 1);
      }

      return null;
    },
  },
};

module.exports = { resolvers };
