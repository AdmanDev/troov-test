import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
import { AppRoutes } from './routes/AppRoutes'
import { ErrorMiddleware } from './middlewares/ErrorMiddleware'

type ErrorHandlerType = {
  syscall: string
  code: string
}

/**
 * Defines express app setup.
 */
export class App {
  static server?: http.Server
  static port: number

  /**
   * Initializes the express server.
   */
  static init() {
    // Create server
    const app = App.createExpressApp()
    App.server = http.createServer(app)

    App.server.on('error', App.errorHandler)
    App.server.on('listening', () => {
      console.log(`🚀 Server running at http://localhost:${App.port}`)
    })

    // Connect to the database
    App.connectToDatabase()

    // Initialize routes and middlewares
    app.use('/api', AppRoutes.use())
    app.use(ErrorMiddleware.handleErrors)

    // Start server
    App.port = parseInt(process.env.PORT as string, 10) || 3001
    App.server.listen(App.port, App.server.address() as string)
  }

  /**
   * Create and configure the Express app.
   * @returns The Express application.
   */
  private static createExpressApp() {
    const app = express()
    app.use(express.json())

    return app
  }

  /**
   * Connect to the database.
   */
  private static async connectToDatabase() {
    const dbUri = process.env.DB_URI as string

    if (!dbUri) {
      throw new Error('Database URI not found in environment variables.')
    }

    await mongoose.connect(dbUri)

    console.log('📦 Database connected')
  }

  /**
   * Handle server errors.
   * @param error - The occured error.
   */
  private static errorHandler(error: ErrorHandlerType) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const address = `http://localhost:${App.port}`

    switch (error.code) {
      case 'EACCES':
        console.error(address + ' requires elevated privileges.')
        process.exit(1)
        break

      case 'EADDRINUSE':
        console.error(address + ' is already in use.')
        process.exit(1)
        break

      default:
        console.error(`${new Date().toISOString()}: FATAL ERROR - `)
        throw error
    }
  }
}

App.init()
