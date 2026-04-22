# 🧾 AI-Powered Expense Tracker

An intelligent expense tracking application that uses AWS Textract AI to automatically extract vendor, amount, date, and category from receipt images.

---

## 🚀 Live Demo

- **Backend:** AWS Lambda Function URL

---

## ✨ Features

- 📸 **AI Receipt Scanning** — Upload any receipt image and AWS Textract automatically extracts data
- 💰 **Smart Amount Extraction** — Handles multiple receipt formats (Walmart, Instamart, etc.)
- 🏷️ **Auto Category Detection** — AI automatically categorizes expenses (Food, Transport, Shopping, Medical, etc.)
- 💱 **Multi-Currency Support** — Supports USD ($), INR (₹), GBP (£), EUR (€)
- 🔄 **Currency Conversion** — All amounts converted to INR for unified totals
- 📊 **Spending Analytics** — Visual charts showing spending by category
- 🗂️ **Expense Management** — View, categorize, and delete expenses
- 🖼️ **Receipt Storage** — Original receipt images stored and viewable anytime

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| Angular 21 | UI Framework |
| TypeScript | Language |
| Standalone Components | Modern Angular architecture |

### Backend
| Technology | Purpose |
|-----------|---------|
| AWS Lambda (Python 3.11) | Serverless backend |
| AWS Textract | AI OCR for receipt scanning |
| AWS S3 | Receipt image storage |
| AWS DynamoDB | Expense data storage |
| Lambda Function URL | API endpoint (no API Gateway needed) |

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────────────────────────┐
│                 │         │           AWS Cloud                   │
│  Angular 21     │         │                                       │
│  Frontend       │────────▶│  Lambda Function URL                  │
│  (Vercel)       │         │         │                             │
│                 │         │         ▼                             │
└─────────────────┘         │  Python Lambda Function               │
                            │         │                             │
                            │    ┌────┴────┐                        │
                            │    ▼         ▼                        │
                            │  AWS S3   DynamoDB                    │
                            │  (Images) (Expenses)                  │
                            │    │                                  │
                            │    ▼                                  │
                            │  AWS Textract                         │
                            │  (AI OCR)                             │
                            └──────────────────────────────────────┘
```

---

## 📁 Project Structure

```
expense-tracker-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/          # Main expense list + stats cards
│   │   │   ├── upload-receipt/     # Receipt upload + AI scan results
│   │   │   └── stats/              # Spending analytics + bar charts
│   │   ├── services/
│   │   │   └── expense.ts          # API service (HTTP calls to Lambda)
│   │   └── app.routes.ts           # Routing configuration
│   └── environments/
│       └── environment.development.ts
│
lambda/
└── lambda_function.py              # Python Lambda (all API routes)
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/expenses` | Get all expenses |
| POST | `/upload-receipt` | Upload receipt + AI scan |
| PUT | `/expenses/{id}` | Update expense category |
| DELETE | `/expenses/{id}` | Delete expense |
| GET | `/stats` | Get spending statistics |

---

## 🤖 AI Receipt Processing

The Lambda function processes receipts in 4 steps:

1. **Upload** — Receipt image saved to S3
2. **OCR** — AWS Textract extracts all text from image
3. **Parse** — Custom algorithm extracts:
   - **Vendor** — First line of receipt
   - **Amount** — Prioritizes Grand Total → Total → largest amount
   - **Date** — Regex pattern matching
   - **Currency** — Detects ₹, £, € symbols
4. **Categorize** — Keyword matching against vendor + raw text

### Category Detection Keywords
| Category | Keywords |
|----------|----------|
| 🍔 Food | restaurant, cafe, zomato, swiggy, mcdonald, pizza |
| 🚗 Transport | uber, ola, petrol, fuel, taxi, flight, metro |
| 🛒 Shopping | walmart, amazon, instamart, grocery, supermarket |
| 🏥 Medical | hospital, pharmacy, apollo, doctor, clinic |
| 🎬 Entertainment | netflix, movie, cinema, spotify, pvr |
| ⚡ Utilities | electricity, water, internet, wifi, gas, bill |

---

## ☁️ AWS Setup

### Services Used
- **S3 Bucket** — Stores receipt images with public read policy
- **DynamoDB Table** — `expenses` table with `id` as partition key
- **Lambda Function** — Python 3.11, 256MB memory, 30s timeout
- **Textract** — On-demand document text detection
- **IAM User** — S3FullAccess + DynamoDBFullAccess + TextractFullAccess

### Environment Variables (Lambda)
```
S3_BUCKET_NAME = your-bucket-name
DYNAMODB_TABLE = expenses
```

---

## 💱 Currency Conversion

All amounts are converted to INR for unified dashboard totals:

| Currency | Exchange Rate |
|----------|--------------|
| USD ($) | 1 USD = ₹83.5 |
| GBP (£) | 1 GBP = ₹106.0 |
| EUR (€) | 1 EUR = ₹90.0 |
| INR (₹) | 1:1 |

---

## 🚀 Local Setup

### Prerequisites
- Node.js v24+
- Angular CLI 21
- AWS Account

### Frontend Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd expense-tracker-frontend

# Install dependencies
npm install

# Update API URL in environment file
# src/environments/environment.development.ts
# apiUrl: 'YOUR_LAMBDA_FUNCTION_URL'

# Start development server
ng serve
```

### Lambda Setup
1. Create Lambda function (Python 3.11)
2. Set environment variables (`S3_BUCKET_NAME`, `DYNAMODB_TABLE`)
3. Paste `lambda_function.py` code
4. Set timeout to 30 seconds, memory to 256MB
5. Enable Function URL with CORS (Auth: NONE)

---

## 📸 Screenshots

| Dashboard | Upload Receipt | Stats |
|-----------|---------------|-------|
| <img width="1869" height="602" alt="image" src="https://github.com/user-attachments/assets/d47d4ce2-f67c-44c3-90f8-4d4f480ea220" /> |
 | <img width="1894" height="842" alt="image" src="https://github.com/user-attachments/assets/1898c077-48c8-4aa3-b3eb-7f1f865b265b" /> |
 |<img width="1895" height="497" alt="image" src="https://github.com/user-attachments/assets/ce383454-fe74-4b56-9241-11fb6e05f015" /> |

---

## 🔒 Security & Cost

- **Zero spend budget** configured in AWS
- **$5 monthly budget alert** set up
- **CloudWatch billing alarm** at $1
- S3 bucket policy restricted to `/receipts/*` path only
- Lambda Function URL with CORS restricted to allowed origins

---

## 👨‍💻 Author

Built as a portfolio project demonstrating:
- AWS serverless architecture
- AI/ML integration (AWS Textract)
- Angular 21 modern features
- Full-stack development skills

