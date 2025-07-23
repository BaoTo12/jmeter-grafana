# E-commerce JMeter Performance Testing

A comprehensive performance testing setup for e-commerce applications using Apache JMeter, Node.js, InfluxDB, and Grafana. This project demonstrates a complete workflow for load testing, metrics collection, and performance visualization.

## 🏗️ Architecture Overview

This project consists of four main components working together:

- **Node.js E-commerce API** - The application under test
- **Apache JMeter** - Load generation and performance testing
- **InfluxDB** - Time-series database for storing performance metrics
- **Grafana** - Visualization platform for performance dashboards

## 🚀 Features

### E-commerce API Features
- **User Authentication** - JWT-based login/registration system
- **Product Management** - CRUD operations for products
- **Shopping Cart** - Add, update, remove items from cart
- **Checkout Process** - Complete order processing workflow
- **MongoDB Integration** - Persistent data storage

### Performance Testing Features
- **Load Testing** - Simulate multiple concurrent users
- **Metrics Collection** - Real-time performance data gathering
- **Time-series Storage** - Historical performance data in InfluxDB
- **Visual Dashboards** - Grafana-powered performance visualization
- **Monitoring Stack** - Complete observability solution

## 📁 Project Structure

```
ecommerce-jmeter-testing/
├── src/                          # Node.js application source code
│   ├── app.js                   # Express application setup
│   ├── controllers/             # API controllers
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── product.controller.js # Product management
│   │   ├── cart.controller.js   # Shopping cart operations
│   │   └── checkout.controller.js # Order processing
│   ├── models/                  # MongoDB data models
│   │   ├── user.model.js        # User schema
│   │   ├── product.model.js     # Product schema
│   │   ├── cart.model.js        # Cart schema
│   │   └── order.model.js       # Order schema
│   ├── routes/                  # API route definitions
│   │   ├── auth/                # Authentication routes
│   │   ├── product/             # Product routes
│   │   ├── cart/                # Cart routes
│   │   └── checkout/            # Checkout routes
│   ├── configs/                 # Configuration files
│   └── dbs/                     # Database initialization
├── influx-db/                   # InfluxDB data directory
├── docker-compose.yml           # Docker services configuration
├── Dockerfile                   # Node.js app containerization
├── server.js                    # Application entry point
├── package.json                 # Node.js dependencies
├── influxdb.html               # InfluxDB & Grafana documentation
├── workflow.html               # Performance testing workflow guide
└── README.md                   # This file
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Security & Performance
- **Helmet** - Security headers
- **Compression** - Response compression
- **Rate Limiting** - Request throttling
- **Morgan** - HTTP request logging

### Monitoring & Testing
- **InfluxDB** - Time-series database
- **Grafana** - Metrics visualization
- **Apache JMeter** - Load testing tool
- **Docker** - Containerization

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- MongoDB (local or cloud instance)
- Apache JMeter (for load testing)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd ecommerce-jmeter-testing
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
APP_PORT=3052
JWT_SECRET=your-jwt-secret-key
MONGODB_URI=mongodb://localhost:27017/ecommerce-test
NODE_ENV=development
```

### 3. Start the Application
```bash
# Start the Node.js application
npm start

# Or using Docker
docker build -t ecommerce-api .
docker run -p 3052:3052 ecommerce-api
```

### 4. Start Monitoring Stack
```bash
# Start InfluxDB and Grafana
docker-compose up -d

# Access services:
# - InfluxDB: http://localhost:8086
# - Grafana: http://localhost:3005
```

## 📊 API Endpoints

### Authentication
- `POST /v1/api/auth/register` - User registration
- `POST /v1/api/auth/login` - User login

### Products (Requires Authentication)
- `GET /v1/api/product` - List all products
- `GET /v1/api/product/:productId` - Get specific product
- `POST /v1/api/product` - Create new product

### Shopping Cart (Requires Authentication)
- `GET /v1/api/cart/:userId` - View user's cart
- `POST /v1/api/cart/:userId` - Add item to cart
- `PUT /v1/api/cart/:userId/:productId` - Update cart item
- `DELETE /v1/api/cart/:userId/:productId` - Remove cart item

### Checkout (Requires Authentication)
- `POST /v1/api/checkout/:userId` - Process order

## 🧪 Performance Testing

### JMeter Test Plan Setup

1. **Thread Group Configuration**
   - Number of threads (users): 50-100
   - Ramp-up period: 30 seconds
   - Loop count: 10

2. **HTTP Request Samplers**
   - User registration/login
   - Product browsing
   - Cart operations
   - Checkout process

3. **Backend Listener Configuration**
   - Implementation: `org.apache.jmeter.visualizers.backend.influxdb.InfluxdbBackendListenerClient`
   - InfluxDB URL: `http://localhost:8086/write?db=jmeter`
   - Measurement: `jmeter`

### Sample Test Scenarios

#### Load Test Scenario
```
1. Register new users (10% of requests)
2. Login existing users (20% of requests)
3. Browse products (40% of requests)
4. Add items to cart (20% of requests)
5. Complete checkout (10% of requests)
```

#### Stress Test Scenario
- Gradually increase load from 1 to 200 users
- Monitor response times and error rates
- Identify breaking point

## 📈 Monitoring and Visualization

### InfluxDB Setup
1. Access InfluxDB at `http://localhost:8086`
2. Login with credentials:
   - Username: `admin`
   - Password: `password123`
3. Organization: `performance-testing`
4. Bucket: `jmeter-metrics`

### Grafana Dashboard Setup
1. Access Grafana at `http://localhost:3005`
2. Add InfluxDB as data source
3. Import JMeter dashboard templates
4. Create custom panels for:
   - Response times
   - Throughput (requests/second)
   - Error rates
   - Active users
   - System resources

### Key Metrics to Monitor
- **Response Time**: Average, 95th percentile, 99th percentile
- **Throughput**: Requests per second
- **Error Rate**: Percentage of failed requests
- **Concurrent Users**: Active user count
- **System Resources**: CPU, Memory, Network

## 🔧 Configuration

### Application Configuration
The application uses several middleware components:

```javascript
// Security and performance middleware
app.use(helmet());           // Security headers
app.use(compression());      // Response compression
app.use(morgan("dev"));      // Request logging
// app.use(limiter);         // Rate limiting (commented out for testing)
```

### Database Initialization
The application includes helper functions to populate test data:

```javascript
// Initialize test users (user001-user100)
initializeUsers(100);

// Initialize test products (Sneaker 1-50)
initProducts(50);
```

## 🐳 Docker Configuration

### Application Container
```dockerfile
FROM node:current-alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . .
CMD ["npm", "run", "start"]
```

### Monitoring Stack
```yaml
services:
  influxdb:
    image: influxdb:2.7-alpine
    ports: ["8086:8086"]
    environment:
      - DOCKER_INFLUXDB_INIT_MODE=setup
      - DOCKER_INFLUXDB_INIT_USERNAME=admin
      - DOCKER_INFLUXDB_INIT_PASSWORD=password123
      
  grafana:
    image: grafana/grafana:main-ubuntu
    ports: ["3005:3000"]
    depends_on: [influxdb]
```

## 📚 Documentation

This project includes comprehensive documentation:

- **[influxdb.html](./influxdb.html)** - Interactive guide to InfluxDB and Grafana concepts
- **[workflow.html](./workflow.html)** - Visual workflow diagram of the testing process

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Ensure MongoDB is running
   mongod --dbpath /path/to/data
   ```

2. **InfluxDB Connection Issues**
   ```bash
   # Check InfluxDB container status
   docker-compose logs influxdb
   ```

3. **Authentication Failures**
   - Verify JWT_SECRET is set correctly
   - Check token expiration (default: 10 hours)

4. **Performance Issues**
   - Monitor system resources during tests
   - Adjust JMeter thread count based on system capacity
   - Enable rate limiting for production environments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Apache JMeter community for the excellent load testing tool
- InfluxData for the time-series database
- Grafana Labs for the visualization platform
- Node.js and Express.js communities

## 📞 Support

For questions and support:
- Create an issue in the repository
- Check the documentation files (influxdb.html, workflow.html)
- Review the troubleshooting section above

---

**Happy Performance Testing! 🚀**
