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
};

module.exports = { resolvers };
