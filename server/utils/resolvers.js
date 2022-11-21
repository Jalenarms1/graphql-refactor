const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express") ;
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        getUser: async ({_id}) => {
            try {
                const foundUser = await User.findOne({_id});
    
                if(!foundUser) throw new AuthenticationError("No user found.")
    
                return foundUser;
                
            } catch (error) {
                console.log(error);
            }
        },
        me: async (parent, args, context) => {
            if(context.user) {
                try {
                    const foundUser = await User.findOne({_id: context.user._id});
        
                    if(!foundUser) throw new AuthenticationError("No user found.")
        
                    return foundUser;
                    
                } catch (error) {
                    console.log(error);
                }
            }
        }

    },

    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            try {
                console.log(email, username, password);
                const user = await User.create({username, email, password});
                const token = signToken(user);
                return {token, user}
                
            } catch (error) {
                return new AuthenticationError(error)
            }
        },

        login: async (parent, {email, password}) => {
            try {
                const user = await User.findOne({email});

                const checkPassword = await user.isCorrectPassword(password);

                if(!checkPassword) throw new AuthenticationError("There was a system error with your request ")
                
                const token = signToken(user);

                return { token, user }

            } catch (error) {
                console.log(error);
            }
        },

        saveBook: async (parent, {authors, description, bookId, image, link, title }, context) => { 
            try {
                console.log("hello");
                const updateUserBooks = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: { savedBooks: {authors, description, bookId, image, link, title}}},
                    {new: true, runValidators: true}
                )

                return updateUserBooks;
                
            } catch (error) {
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