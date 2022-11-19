const { User } = require("../models");
const { AuthentencationError } = require("apollo-server-express") ;
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        getUser: async ({_id}) => {
            try {
                const foundUser = await User.findOne({_id});
    
                if(!foundUser) throw new AuthentencationError("No user found.")
    
                return foundUser;
                
            } catch (error) {
                console.log(error);
            }
        },

    },

    Mutation: {
        createUser: async ({email, username, password}) => {
            try {

                const user = await User.create({email, username, password});

                const token = signToken(user);


                return { token, user }
                
            } catch (error) {
                console.log(error);
            }
        },

        login: async (parent, {email, password}) => {
            try {
                const user = await User.findOne({email});

                const checkPassword = await user.isCorrectPassword(password);

                if(!checkPassword) throw new AuthentencationError("There was a system error with your request ")
                
                const token = signToken(user);

                return { token, user }

            } catch (error) {
                console.log(error);
            }
        },

        saveBook: async (parent, {authors, description, bookId, image, link, title }, context) => { 
            try {
                try {
                    const updateUserBooks = await User.findOneAndUpdate(
                        {_id: context.user._id},
                        {$addToSet: { savedBooks: authors, description, bookId, image, link, title}},
                        {new: true, runValidators: true}
                    )

                    return updateUserBooks;
                    
                } catch (error) {
                    return error
                }

            } catch (error) {
                console.log(erorr);

                return error
            }
        },

        deleteBook: async (parent, {bookId}, context) => {
            try {

                const deletedBook = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: { savedBooks: { bookId }}},
                    {new: true}
                )

                return deletedBook
                
            } catch (error) {
                return error
            }
        }


    }
}

module.exports = resolvers;