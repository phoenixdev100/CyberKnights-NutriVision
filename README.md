# Nutrivision - Food Image Classification and Nutrition Analysis

## Project Overview
Nutrivision is an innovative food image classification system that uses computer vision to identify food items and provide nutritional information. The project combines machine learning models with a user-friendly web interface to help users understand the nutritional content of their meals.

## Project Structure
```
Nutrivision/
├── NutriVision Main Website/    # Main website frontend
├── template/                    # Flask templates
├── models/                      # Trained ML models
├── app.py                       # Flask backend application
└── ViT_predicting_food_images.ipynb  # Model training notebook
```

## Features
- Food image classification using Vision Transformer (ViT) model
- Real-time nutritional information display
- User-friendly web interface
- Flask-based backend server
- Integration with nutrition databases

## Prerequisites
- Python 3.8+
- Flask
- PyTorch
- OpenCV
- NumPy
- Pandas

## Installation

1. Clone the repository:
```bash
git clone https://github.com/phoenixdev100/nutrivision.git
cd nutrivision
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Before running app file make sure to add gemini api key to app.py file

2. Start the Flask server:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Upload a food image and get instant nutritional analysis

## Directory Structure Details

### 1. NutriVision Main Website
- Contains the main frontend code
- HTML, CSS, and JavaScript files
- User interface components
- Static assets (images, stylesheets)

#### Steps to Run NutriVision Main Website:
1. Navigate to the main website directory:
```bash
cd "NutriVision Main Website"
python -m http.server
```

2. Install required frontend dependencies:
```bash
npm install  # If using Node.js
# or
pip install -r requirements.txt  # If using Python packages
```

3. Start the development server:
```bash
# For Node.js projects:
npm start
# or
npm run dev

# For Python projects:
python manage.py runserver
# or
flask run
```

4. Access the website:
- Open your web browser
- Navigate to: `http://localhost:3000` (for Node.js) or `http://localhost:5000` (for Python)
- The main interface should be visible with options to:
  - Upload food images
  - View nutritional analysis
  - Access food database
  - View user profile

5. Development Tips:
- Make sure the backend server (app.py) is running simultaneously
- Check browser console for any errors
- Ensure all API endpoints are properly configured
- Test image upload functionality
- Verify nutritional data display

### 2. Template
- Flask template files
- HTML templates for different pages
- Layout components
- Form templates

### 3. app.py
- Main Flask application
- API endpoints
- Model integration
- Image processing functions

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Vision Transformer (ViT) model
- Food-101 dataset
- Flask framework
- PyTorch community 