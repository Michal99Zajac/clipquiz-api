import type { RouteDefinition as ValidatorRouteDefinition } from '@fastify/ajv-compiler'
import type { RouteDefinition as SerializerRouteDefinition } from '@fastify/fast-json-stringify-compiler'
import sanitize from 'sanitize-filename'

export type RouteOpts = ValidatorRouteDefinition | SerializerRouteDefinition
export { ValidatorRouteDefinition, SerializerRouteDefinition }

/**
 * Check if the route definition is for validation or serialization
 *
 * @param routeOpts - The route definition
 * @returns True if the route definition is for validation
 */
function isValidatorRouteDefinition(routeOpts: RouteOpts): routeOpts is ValidatorRouteDefinition {
  return (routeOpts as ValidatorRouteDefinition).httpPart !== undefined
}

/**
 * Generate a file name for the generated schema
 *
 * @param routeOpts - The route definition
 * @returns The file name
 */
export function generateFileName(routeOpts: RouteOpts) {
  let fileNameSuffix: string

  // routeOpts is: { schema, method, url, httpPart } when the schema is for validation
  // or: { schema, method, url, httpStatus } when the schema is for serialization
  if (isValidatorRouteDefinition(routeOpts)) {
    fileNameSuffix = routeOpts.httpPart
  } else {
    fileNameSuffix = routeOpts.httpStatus
  }

  return `generated-${routeOpts.method}-${fileNameSuffix}-${sanitize(routeOpts.url)}.js`
}
