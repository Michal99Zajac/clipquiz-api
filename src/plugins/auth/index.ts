import passport from '@fastify/passport'
import { preValidationHookHandler } from 'fastify/types/hooks'
import fp from 'fastify-plugin'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import { GOOGLE_OAUTH2_CALLBACK_URL } from '@/config/const'
import { env } from '@/config/env'

/**
 * This plugins adds some utilities to handle authentication
 *
 * @see https://github.com/fastify/fastify-passport
 */
export default fp(
  async (fastify) => {
    // register the fastify-passport plugin
    fastify.register(passport.initialize())
    fastify.register(passport.secureSession())

    // register the Google OAuth2 strategy
    passport.use(
      'google',
      new GoogleStrategy(
        {
          clientID: env.GOOGLE_OAUTH2_CLIENT_ID,
          clientSecret: env.GOOGLE_OAUTH2_SECRET,
          callbackURL: GOOGLE_OAUTH2_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
          return done(null, profile)
        },
      ),
    )

    // serialize user
    passport.registerUserSerializer(async (data) => {
      // TODO: get user id from data
      return data
    })

    // deserialize user
    passport.registerUserDeserializer(async (data) => {
      // TODO: fetch user from database
      return data
    })

    // implement the authenticate method
    const authenticate: preValidationHookHandler = async (req, reply, done) => {
      // check if the user is authenticated
      if (!req.user) {
        reply.status(401)
        done(new Error('Unauthorized'))
      }

      // user is authenticated
      done()
    }

    // decorate the fastify instance with the authenticate method
    fastify.decorate('authenticate', authenticate)

    // decorate the fastify instance with passport
    fastify.decorate('passport', passport)
  },
  {
    name: 'auth-plugin',
    dependencies: ['session-plugin'],
  },
)
