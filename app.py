from flask import Flask, request, jsonify

app = Flask(__name__)

# Mock data
school_fee_data = {
    'undergraduate': '$10,000 per year',
    'graduate': '$12,000 per year'
}

admission_data = {
    'undergraduate': 'Open for applications',
    'graduate': 'Admissions closed'
}

courses_data = {
    'computer_science': 'Bachelor of Science in Computer Science',
    'business_admin': 'Bachelor of Business Administration',
    'nursing': 'Bachelor of Science in Nursing'
}

@app.route('/')
def index():
    return 'Welcome to Macpherson University Chatbot API'

@app.route('/school-fee/<level>')
def get_school_fee(level):
    if level in school_fee_data:
        return jsonify({'fee': school_fee_data[level]})
    return jsonify({'error': 'Level not found'}), 404

@app.route('/admission/<level>')
def get_admission(level):
    if level in admission_data:
        return jsonify({'status': admission_data[level]})
    return jsonify({'error': 'Level not found'}), 404

@app.route('/courses/<course>')
def get_course_details(course):
    if course in courses_data:
        return jsonify({'course_name': courses_data[course]})
    return jsonify({'error': 'Course not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
