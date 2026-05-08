const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();
const port = 2005;

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crpms"
});

mysqlConnection.connect((error) => {
    if (error) {
        console.log("Database connection failed:", error);
    } else {
        console.log("Successfully connected to database");
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: "kam_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Authentication Endpoints
app.post("/register", async (req, res) => {
    const { name, password } = req.body;
    try {
        const hashpass = await bcrypt.hash(password, 10);
        const select = `SELECT * FROM users WHERE name = ?`;

        mysqlConnection.query(select, [name], (error, results) => {
            if (error) return res.status(500).json({ error: "Error while checking user" });
            if (results.length > 0) {
                return res.status(403).json({ error: "Account exists. Try another username" });
            }

            const insert = `INSERT INTO users(name, password) VALUES (?, ?)`;
            mysqlConnection.query(insert, [name, hashpass], (err) => {
                if (err) return res.status(500).json({ error: "Error creating user" });
                res.status(201).json({ message: "User registered successfully" });
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/login", (req, res) => {
    const { name, password } = req.body;
    const select = `SELECT * FROM users WHERE name = ?`;

    mysqlConnection.query(select, [name], async (error, results) => {
        if (error) return res.status(500).json({ error: "Database error during login" });

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.user = user;
                return res.status(200).json({ message: "Logged in successfully" });
            } else {
                return res.status(403).json({ error: "Incorrect password" });
            }
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    });
});

app.get("/check-auth", (req, res) => {
    if (req.session.user) {
        res.status(200).json({ authenticated: true, message: req.session.user });
    } else {
        res.status(403).json({ error: "Not authenticated" });
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) return res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logged out successfully" });
    });
});

app.post("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) return res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logged out successfully" });
    });
});

// Service Endpoints
app.post("/add-services", (req, res) => {
    const { serviceName, servicePrice } = req.body;
    const insert = `INSERT INTO services(ServiceName, ServicePrice) VALUES (?, ?)`;

    mysqlConnection.query(insert, [serviceName, servicePrice], (error) => {
        if (error) return res.status(500).json({ error: "Failed to add service" });
        res.status(201).json({ message: "Service added successfully" });
    });
});

app.get('/services', (req, res) => {
    const select = `SELECT * FROM services`;
    mysqlConnection.query(select, (error, results) => {
        if (error) return res.status(500).json({ error: "Fetch failed" });
        res.json(results || []);
    });
});

app.delete('/services/:ServiceCode', (req, res) => {
    const { ServiceCode } = req.params;
    const del = 'DELETE FROM services WHERE ServiceCode = ?';

    mysqlConnection.query(del, [ServiceCode], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete service' });
        res.status(200).json({ message: 'Service deleted successfully' });
    });
});

app.get('/update-service/:ServiceCode', (req, res) => {
    const { ServiceCode } = req.params;
    const query = 'SELECT ServiceName, ServicePrice FROM services WHERE ServiceCode = ?';
    
    mysqlConnection.query(query, [ServiceCode], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve service data' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json(results[0]);
    });
});

app.post('/update-service/:ServiceCode', (req, res) => {
    const { ServiceCode } = req.params;
    const { ServiceName, ServicePrice } = req.body;

    const query = 'UPDATE services SET ServiceName = ?, ServicePrice = ? WHERE ServiceCode = ?';
    
    mysqlConnection.query(query, [ServiceName, ServicePrice, ServiceCode], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to update service' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({ message: 'Service updated successfully' });
    });
});

// Service Record & Car Endpoints
app.post("/give-service/:servicecode", (req, res) => {
    const { servicecode } = req.params;
    const { plateNumber, type, model, manufacturingYear, driverPhone, mechanicName, ServiceDate } = req.body;

    const checkCar = `SELECT * FROM car WHERE PlateNumber = ?`;
    
    mysqlConnection.query(checkCar, [plateNumber], (checkError, carResults) => {
        if (checkError) return res.status(500).json({ error: "Failed to check car" });

        if (carResults.length > 0) {
            const carUpdate = `
                UPDATE car 
                SET Type = ?, Model = ?, ManufacturingYear = ?, DriverPhone = ?, MechanicName = ?
                WHERE PlateNumber = ?
            `;
            
            mysqlConnection.query(carUpdate, [type, model, manufacturingYear, driverPhone, mechanicName, plateNumber], (updateError) => {
                if (updateError) return res.status(500).json({ error: "Failed to update car" });
                
                const recordInsert = `
                    INSERT INTO servicerecord (ServiceDate, PlateNumber, ServiceCode)
                    VALUES (?, ?, ?)
                `;

                mysqlConnection.query(recordInsert, [ServiceDate, plateNumber, servicecode], (recordError) => {
                    if (recordError) return res.status(500).json({ error: "Failed to record service" });
                    res.status(200).json({ message: "Service successfully recorded" });
                });
            });
        } else {
            const carInsert = `
                INSERT INTO car (PlateNumber, Type, Model, ManufacturingYear, DriverPhone, MechanicName)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            mysqlConnection.query(carInsert, [plateNumber, type, model, manufacturingYear, driverPhone, mechanicName], (carError) => {
                if (carError) return res.status(500).json({ error: "Failed to add car" });

                const recordInsert = `
                    INSERT INTO servicerecord (ServiceDate, PlateNumber, ServiceCode)
                    VALUES (?, ?, ?)
                `;

                mysqlConnection.query(recordInsert, [ServiceDate, plateNumber, servicecode], (recordError) => {
                    if (recordError) return res.status(500).json({ error: "Failed to record service" });
                    res.status(200).json({ message: "Service successfully recorded" });
                });
            });
        }
    });
});

app.get("/service-record", (req, res) => {
    const select = `
        SELECT 
            sr.RecordNumber,
            sr.ServiceDate,
            sr.PlateNumber,
            sr.ServiceCode,
            s.ServiceName,
            s.ServicePrice,
            c.Type,
            c.Model,
            c.ManufacturingYear,
            c.DriverPhone,
            c.MechanicName
        FROM servicerecord sr
        LEFT JOIN car c ON sr.PlateNumber = c.PlateNumber
        LEFT JOIN services s ON sr.ServiceCode = s.ServiceCode
        ORDER BY sr.RecordNumber DESC
    `;

    mysqlConnection.query(select, (error, results) => {
        if (error) return res.status(500).json({ error: "Failed to retrieve service records" });
        res.json(results || []);
    });
});

app.get("/cars-with-services", (req, res) => {
    const query = `
        SELECT c.PlateNumber, c.Type, c.Model, c.ManufacturingYear, c.DriverPhone, c.MechanicName,
               sr.RecordNumber, sr.ServiceDate, sr.ServiceCode
        FROM car c
        LEFT JOIN servicerecord sr ON c.PlateNumber = sr.PlateNumber
        ORDER BY c.PlateNumber DESC
    `;

    mysqlConnection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching cars with services:", err);
            return res.status(500).json({ error: "Failed to fetch cars with services" });
        }
        res.json(results || []);
    });
});

// Payment Endpoints
app.get('/payments', (req, res) => {
    const query = `
        SELECT 
            PaymentNumber, 
            AmountPaid, 
            DATE_FORMAT(PaymentDate, '%Y-%m-%d') AS PaymentDate, 
            PlateNumber, 
            ServiceCode 
        FROM payments
        ORDER BY PaymentDate DESC
    `;

    mysqlConnection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching payments:', err);
            return res.status(500).json({ error: 'Failed to fetch payments' });
        }
        res.json(results || []);
    });
});

app.post("/payments", (req, res) => {
    const { AmountPaid, PaymentDate, PlateNumber, ServiceCode } = req.body;

    const insertQuery = `
        INSERT INTO payments (AmountPaid, PaymentDate, PlateNumber, ServiceCode)
        VALUES (?, ?, ?, ?)
    `;

    mysqlConnection.query(insertQuery, [AmountPaid, PaymentDate, PlateNumber, ServiceCode], (error) => {
        if (error) return res.status(500).json({ error: "Payment failed" });
        res.status(200).json({ message: "Payment recorded successfully" });
    });
});

// Report Endpoint
app.get("/report/:type", (req, res) => {
    const { type } = req.params;

    let selectFields = "";
    let groupByFields = "";

    switch (type) {
        case "daily":
            selectFields = "DATE(sr.ServiceDate) AS Period";
            groupByFields = "DATE(sr.ServiceDate)";
            break;
        case "weekly":
            selectFields = "YEAR(sr.ServiceDate) AS Year, WEEK(sr.ServiceDate) AS Week";
            groupByFields = "YEAR(sr.ServiceDate), WEEK(sr.ServiceDate)";
            break;
        case "monthly":
            selectFields = "YEAR(sr.ServiceDate) AS Year, MONTH(sr.ServiceDate) AS Month";
            groupByFields = "YEAR(sr.ServiceDate), MONTH(sr.ServiceDate)";
            break;
        case "yearly":
            selectFields = "YEAR(sr.ServiceDate) AS Year";
            groupByFields = "YEAR(sr.ServiceDate)";
            break;
        default:
            return res.status(400).json({ error: "Invalid report type" });
    }

    const query = `
        SELECT 
            ${selectFields},
            COUNT(DISTINCT sr.RecordNumber) AS TotalServices,
            COALESCE(SUM(p.AmountPaid), 0) AS TotalRevenue
        FROM servicerecord sr
        LEFT JOIN payments p 
            ON sr.PlateNumber = p.PlateNumber 
            AND sr.ServiceCode = p.ServiceCode
        GROUP BY ${groupByFields}
        ORDER BY sr.ServiceDate DESC
    `;

    mysqlConnection.query(query, (err, results) => {
        if (err) {
            console.error("Report query failed:", err);
            return res.status(500).json({ error: "Failed to fetch report" });
        }
        res.json(results || []);
    });
});

// Start server
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
