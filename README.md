# Points API

Endpoints for off-chain points management.

## Overview

This project provides APIs for managing points off-chain. It's built using NestJS, TypeScript, Prisma ORM, and is deployed on Vercel with a PostgreSQL database.

## APIs

### Auth

#### Create API Key

- **Endpoint:** `/auth/api-key`
- **Method:** `POST`
- **Description:** Create a new API key.
- **Request Body:**
  ```typescript
  createApiKey(@Body() createApiKeyDto: CreateApiKeyDto)
  ```
- **CreateApiKeyDto:**
```typescript
export class CreateApiKeyDto {
  campaign_name: string;
  campaign_id: string;
}
```
- **Response:** Returns the created API key.

### Points

#### Distribute Points

- **Endpoint:** `/points/distribute`
- **Method:** `POST`
- **Description:** Distribute points to a specific address.
- **Request Body:**
```typescript
distribute(@Body() distributePointsDto: DistributePointsDto, @Request() req: Request)
```
- **DistributePointsDto:**
```typescript
export class DistributePointsDto {
  event_name: string;
  points: number;
  address: string;
}
```
- **Response:** Returns the result of the distribution.

#### Get Points

- **Endpoint: `/points`
- **Method: `GET`
- **Description: Get points for a specific address.
- **Query Parameters: `address`, `event_name`(optional)
- **Request:**
```typescript
getPoints(@Query() query: QueryPointsDto, @Request() req: Request)
```
- **QueryPointsDto:**
```typescript
export class QueryPointsDto {
  event_name: string;
  address: string;
}
```
- **Response:** Returns the points for the specified address.
