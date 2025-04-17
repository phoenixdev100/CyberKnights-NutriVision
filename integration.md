# Integration Plan & ChatGPT Prompts

## 1. Meal & Recipe Generator
### 1.1 Define Data Models & Endpoints
- Add models: `Recipe`, `Ingredient`, `MealPlan`.
- Create REST endpoints:  
  - POST /recipes  
  - GET /recipes/{id}  
  - POST /mealplans

#### Prompt for ChatGPT
```text
“Help me write Python FastAPI data models and CRUD endpoints for a meal planning service. The models: 
- Recipe (id, name, ingredients: List[Ingredient], steps: List[str], calories, macro breakdown)
- Ingredient (name, quantity, unit)
- MealPlan (id, user_id, date, recipes: List[Recipe])
Include Pydantic schemas, SQLAlchemy models, and example migrations.”
```

### 1.2 AI‑driven Recipe Suggestion
- Integrate LLM chain to generate recipes from identified foods, goals, allergies.
- Design prompt template for LLM.

#### Prompt for ChatGPT
```text
“Generate a recipe‑creation prompt template for OpenAI’s GPT‑4: input includes detected foods (list of strings), user goals (calorie target, macros), allergies and pantry items. Output: JSON with recipe name, step-by-step instructions, ingredients list with quantities, and nutritional totals.”
```

### 1.3 Frontend: Meal Plan UI
- Build React/Vue components: Meal calendar view, recipe cards, plan editor.
- Connect to API.

#### Prompt for ChatGPT
```text
“Create a React component ‘MealPlanEditor’ with a weekly calendar grid. Each cell shows a RecipeCard (title, thumbnail, calories). Allow drag‑and‑drop recipes into the grid. Use Chakra‑UI and hook up with endpoints /recipes and /mealplans.”
```

---

## 2. Smart Grocery & Delivery Integration
### 2.1 API Client for Grocery Providers
- Select providers: e.g. Instacart, Amazon Fresh.
- Write a Node.js/TS client for product search, price retrieval, order creation.

#### Prompt for ChatGPT
```text
“Write a TypeScript class ‘GroceryAPIClient’ to interface with Instacart:
- methods: searchProducts(query: string), getProductPrice(id: string), createOrder(items: Array<{id, qty}>).
Use Axios, handle OAuth2 authentication, and include error handling.”
```

### 2.2 Grocery List Generation
- On meal plan save: auto‑compute needed ingredients.
- Expose GET /users/{id}/grocery-list.

#### Prompt for ChatGPT
```text
“Design a Python service method that, given a MealPlan object, aggregates all Ingredient quantities into a single grocery list (deduplicated, summed by unit). Provide unit conversion (e.g. grams to kg). Return JSON list ‘[{ingredient, totalQty, unit}]’.”
```

### 2.3 One‑Click Ordering UI
- Frontend button “Order Now” on grocery list.
- Trigger backend to call GroceryAPIClient.

#### Prompt for ChatGPT
```text
“Implement a Vue component ‘GroceryList’ displaying items with checkboxes and an ‘Order Now’ button. On click, call POST /order-grocery with selected items and show success/failure toast using Vuetify.”
```

---

## 3. Wearables & Health‑Data Fusion
### 3.1 Connect to Health APIs
- Integrate Apple Health via HealthKit JS or Google Fit REST.
- Build OAuth flow, store tokens.

#### Prompt for ChatGPT
```text
“Generate a Node.js/Express OAuth2 flow for Google Fit:
- route GET /auth/google-fit to redirect to consent screen
- callback GET /auth/google-fit/callback to exchange code for tokens
- store tokens in PostgreSQL ‘user_health_tokens’ table.”
```

### 3.2 Data Ingestion & Normalization
- Cron job or webhook endpoint to pull daily metrics: steps, heart rate, sleep.
- Normalize units, store in time‑series table.

#### Prompt for ChatGPT
```text
“Help me write a Python ETL script that uses stored Google Fit tokens to fetch daily stepCount, restingHeartRate, and sleepDuration. Normalize to {date, metricType, value} and store in a TimescaleDB hypertable.”
```

### 3.3 Dynamic Goal Adjustment
- Algorithm: adjust calorie/macro goals based on activity.
- Expose GET /users/{id}/dynamic-goals.

#### Prompt for ChatGPT
```text
“Create a Python function ‘calculate_dynamic_goals(user_id)’:
- inputs: baseline calories/macros, avg_daily_steps, avg_sleep
- logic: +100 kcal per 2000 extra steps, adjust macros proportionally
- output: JSON {calorieGoal, proteinGoal, carbGoal, fatGoal}.”
```

---

## 4. Augmented‑Reality Nutrition Overlay
### 4.1 Object Segmentation & Annotation
- Use TensorFlow.js or MediaPipe for real‑time food segmentation in browser.
- Overlay labels with Three.js or WebAR frameworks.

#### Prompt for ChatGPT
```text
“Provide an HTML5/WebXR example that uses TensorFlow.js to segment a single food item from webcam input, then overlays a floating label with its name and calorie info. Use Three.js for rendering a 3D label above the object.”
```

### 4.2 Portion‑Control Guides
- Integrate reference objects (credit‑card size) to estimate portion volume.
- Compute calories-per-portion.

#### Prompt for ChatGPT
```text
“Explain how to estimate food portion size in AR using a known reference object. Provide code snippets in JS that detect the reference’s size in the camera feed and scale the detected food bounding box to compute volume.”
```

---

## 5. Gamification & Community
### 5.1 Badges & Streaks Engine
- Define badge rules (e.g. ‘5 days of veggies’).
- Backend job to evaluate and award badges daily.

#### Prompt for ChatGPT
```text
“Design a Python badge engine: 
- input: user food logs
- rules: JSON definitions (streakLength, category)
- output: list of earned badges
Show sample rule JSON and evaluation code.”
```

### 5.2 Community Feed API
- Models: Post, Comment, Like.
- Endpoints: GET /feed, POST /posts, POST /posts/{id}/comments.

#### Prompt for ChatGPT
```text
“Generate Django REST Framework serializers, views, and routes for a CommunityFeed:
- models: Post(user, image, caption, createdAt), Comment(post, user, text)
- include pagination and permission checks so only owners can delete their posts/comments.”
```

### 5.3 Leaderboards & Team Challenges
- Compute weekly top users based on points.
- Endpoint: GET /leaderboard?scope=global|team.

#### Prompt for ChatGPT
```text
“Write a SQL query that ranks users by weekly points (points per food log), partitioned by team. Then expose via an Express endpoint GET /leaderboard?scope=team&teamId=XYZ.”
```

---

## 6. Predictive Health Insights & Alerts
### 6.1 Trend Analysis Jobs
- Scheduled job to analyze 30‑day trends (macros, calories).
- Flag anomalies (3‑day low protein, etc).

#### Prompt for ChatGPT
```text
“Create a Python Airflow DAG ‘trend_analysis’ that:
- daily: loads last 30 days of nutrition logs
- computes moving averages and standard deviation
- inserts anomaly records into Postgres ‘alerts’ table if thresholds exceeded.”
```

### 6.2 Notification Service
- Use FCM/APNs for push notifications.
- Template alerts: “Low protein streak”, “Goal achieved”.

#### Prompt for ChatGPT
```text
“Produce a Node.js service using Firebase Admin SDK to send push notifications. Include functions ‘sendLowProteinAlert(userId)’ and ‘sendGoalAchievedAlert(userId)’.”
```

### 6.3 Health Report Export
- Generate PDF report with charts using Plotly and WeasyPrint.
- Endpoint: GET /users/{id}/health-report?period=quarterly.

#### Prompt for ChatGPT
```text
“Write a Python FastAPI route that produces a quarterly health report PDF:
- fetch 90 days of data
- generate charts with Plotly
- assemble PDF with WeasyPrint
- return as application/pdf response.”
```

---

## 7. Scalability & DevOps
### 7.1 Infrastructure as Code
- Terraform scripts for AWS: VPC, ECS/EKS, RDS, S3.

#### Prompt for ChatGPT
```text
“Create Terraform code to provision:
- AWS VPC with public/private subnets
- ECS cluster with Fargate services for API and worker
- RDS PostgreSQL instance
- S3 bucket for images
Include outputs for service URLs and DB connection strings.”
```

### 7.2 CI/CD with GitHub Actions
- Workflow: test → lint → build Docker → push → deploy.

#### Prompt for ChatGPT
```text
“Generate a GitHub Actions YAML workflow:
- triggers: push to main
- jobs: 
  lint (flake8, eslint), 
  test (pytest), 
  build-and-publish (docker build, push to AWS ECR), 
  deploy (apply Terraform).”
```

---

## 8. Open API & Extensibility
### 8.1 API Documentation
- Swagger/OpenAPI definitions for all endpoints.
- Host via Swagger UI.

#### Prompt for ChatGPT
```text
“Produce an OpenAPI 3.0 spec YAML for our nutrition platform’s REST API: include paths for /recipes, /mealplans, /grocery-list, /health-data and /community-feed. Define schemas and security schemes (JWT).”
```

### 8.2 SDK Generation
- Generate TypeScript & Python SDKs via OpenAPI Generator.

#### Prompt for ChatGPT
```text
“Show me the CLI commands to generate TypeScript and Python client SDKs using OpenAPI Generator from our openapi.yaml, and how to import/use them in a sample script.”
```

---

## 9. Accessibility & Internationalization
### 9.1 WCAG Compliance
- Ensure keyboard nav, ARIA labels, high‑contrast themes.
- Audit with Lighthouse.

#### Prompt for ChatGPT
```text
“List code changes needed in React components to comply with WCAG 2.1: add aria-labels, tabIndex, role attributes, and contrast checks. Provide examples before/after.” 
```

### 9.2 i18n & Localization
- Integrate i18next or vue-i18n.
- Externalize strings, support metric/imperial conversions.

#### Prompt for ChatGPT
```text
“Write an i18next config for React that:
- loads translations from /locales/{lang}/common.json
- supports switching languages
- includes a custom hook useTranslation for ease of use.”
```