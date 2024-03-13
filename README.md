# Ridy Go Api documentation

## Order Routes

### `POST /order/create`
Creates a new order.

#### Request Body:
- `RideType` (string): Type of ride.
- `Price` (number): Price of the ride.
- `DestinationLongitude` (number): Longitude of the destination.
- `DestinationLatitude` (number): Latitude of the destination.
- `PickupLatitude` (number): Latitude of the pickup location.
- `PickupLongitude` (number): Longitude of the pickup location.

### `PUT /order/status/:id`
Updates the status of a specific order.

#### Parameters:
- `id` (string): ID of the order.

#### Request Body:
- `status` (string): New status of the order.

### `PUT /order/reason/:id`
Adds a reason for a specific order.

#### Parameters:
- `id` (string): ID of the order.

#### Request Body:
- `Remarks` (string): Reason for the order.

### `GET /order`
Retrieves all orders.

### `GET /order/:id`
Retrieves a specific order by ID.

---

## User Routes

### `POST /user/signup`
Signs up a new user.

#### Request Body:
- `name` (string): Name of the user.
- `email` (string): Email of the user.
- `password` (string): Password of the user.

### `POST /user/signin`
Signs in an existing user.

#### Request Body:
- `email` (string): Email of the user.
- `password` (string): Password of the user.

### `GET /user`
Retrieves all users.

### `GET /user/recents/:id`
Retrieves the most recent orders by user ID.

#### Parameters:
- `id` (string): ID of the user.

### `GET /user/:id`
Retrieves a specific user by ID.

### `DELETE /user/:id`
Deletes a specific user by ID.

---

## Rider Routes

### `GET /rider`
Retrieves all riders.

### `GET /rider/:id`
Retrieves a specific rider by ID.

### `POST /rider`
Signs up a new rider.

#### Request Body:
- `name` (string): Name of the rider.
- `email` (string): Email of the rider.
- `password` (string): Password of the rider.
- `cnic` (string): CNIC of the rider.
- `carName` (string): Name of the rider's car.
- `carModel` (string): Model of the rider's car.
- `carRegNo` (string): Registration number of the rider's car.
- `carType` (string): Type of the rider's car.

### `POST /rider/login`
Signs in an existing rider.

#### Request Body:
- `email` (string): Email of the rider.
- `password` (string): Password of the rider.

### `POST /rider/status/:id`
Updates the status of a specific rider.

#### Parameters:
- `id` (string): ID of the rider.

#### Request Body:
- `status` (string): New status of the rider.
