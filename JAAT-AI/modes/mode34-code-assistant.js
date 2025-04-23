/**
 * JAAT-AI Mode: Code Assistant
 * 
 * Programming and development support with code generation,
 * debugging, explanation, and best practices across multiple languages.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const CodeAssistantMode = {
  id: 'code-assistant',
  name: 'Code Assistant',
  icon: 'code',
  description: 'Programming support across multiple languages.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Code Assistant mode, a specialized programming and development assistant. You help with code generation, debugging, explanation, and best practices across multiple programming languages.

Key characteristics:
1. You provide clear, efficient, and well-documented code examples
2. You can explain programming concepts at various levels of complexity
3. You debug code by identifying potential issues and suggesting fixes
4. You follow industry best practices and modern development standards
5. You can help refactor code for improved readability, performance, or maintainability
6. You adapt your assistance to the user's skill level, from beginner to advanced
7. You're familiar with multiple programming languages, frameworks, and libraries

When providing code, always include clear comments, explain your approach, and highlight any assumptions or limitations. Format code properly for readability and follow standard conventions for the language in question.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "How do I create a simple REST API with Node.js?",
    "Can you help me debug this Python function that's not working?",
    "Explain how asynchronous programming works in JavaScript.",
    "Generate a CSS flexbox layout for a responsive card grid.",
    "What's the difference between == and === in JavaScript?",
    "Write a function to reverse a string in Java.",
    "How do I connect to a PostgreSQL database using Python?",
    "Convert this for loop to a more efficient array method in JavaScript.",
    "Create a simple React component for a login form.",
    "Explain Big O notation and why it matters for algorithms."
  ],
  
  // Supported programming languages
  languages: [
    {
      name: 'JavaScript',
      icon: 'js',
      description: 'Versatile scripting language for web development, both frontend and backend',
      frameworks: ['React', 'Angular', 'Vue', 'Node.js', 'Express', 'Next.js'],
      bestPractices: [
        'Use const and let instead of var',
        'Employ arrow functions for cleaner syntax',
        'Utilize async/await for asynchronous operations',
        'Implement destructuring for cleaner variable assignments',
        'Apply functional programming principles where appropriate',
        'Follow ESLint and Prettier configurations for consistent code style'
      ],
      resources: [
        { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'JavaScript.info', url: 'https://javascript.info/' },
        { name: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/' }
      ]
    },
    {
      name: 'Python',
      icon: 'python',
      description: 'High-level language known for readability and versatility in various domains',
      frameworks: ['Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy', 'TensorFlow'],
      bestPractices: [
        'Follow PEP 8 style guidelines',
        'Use virtual environments for project isolation',
        'Write docstrings for functions and classes',
        'Utilize list comprehensions for cleaner code',
        'Implement context managers with the "with" statement',
        'Apply type hints for better code clarity and tooling support'
      ],
      resources: [
        { name: 'Python Documentation', url: 'https://docs.python.org/3/' },
        { name: 'Real Python', url: 'https://realpython.com/' },
        { name: 'Python Crash Course (Book)', url: 'https://nostarch.com/pythoncrashcourse2e' }
      ]
    },
    {
      name: 'Java',
      icon: 'java',
      description: 'Strongly typed, object-oriented language used for enterprise applications',
      frameworks: ['Spring', 'Hibernate', 'JavaFX', 'Apache Struts', 'Play', 'Micronaut'],
      bestPractices: [
        'Follow naming conventions (camelCase for methods, PascalCase for classes)',
        'Implement proper exception handling',
        'Use interfaces for loose coupling',
        'Implement design patterns appropriately',
        'Utilize streams and lambdas for modern functional approaches',
        'Apply immutability where possible'
      ],
      resources: [
        { name: 'Oracle Java Documentation', url: 'https://docs.oracle.com/en/java/' },
        { name: 'Baeldung', url: 'https://www.baeldung.com/' },
        { name: 'Java Design Patterns', url: 'https://java-design-patterns.com/' }
      ]
    },
    {
      name: 'C#',
      icon: 'microsoft',
      description: 'Modern object-oriented language developed by Microsoft for the .NET platform',
      frameworks: ['.NET Core', 'ASP.NET', 'Entity Framework', 'Xamarin', 'Unity', 'Blazor'],
      bestPractices: [
        'Use properties instead of public fields',
        'Implement IDisposable for resource cleanup',
        'Utilize LINQ for data operations',
        'Apply async/await for asynchronous code',
        'Implement dependency injection for better testability',
        'Use nullable reference types to minimize null reference exceptions'
      ],
      resources: [
        { name: 'Microsoft C# Documentation', url: 'https://docs.microsoft.com/en-us/dotnet/csharp/' },
        { name: 'C# Corner', url: 'https://www.c-sharpcorner.com/' },
        { name: 'C# in Depth (Book)', url: 'https://csharpindepth.com/' }
      ]
    },
    {
      name: 'TypeScript',
      icon: 'ts',
      description: 'Typed superset of JavaScript that compiles to plain JavaScript',
      frameworks: ['Angular', 'NestJS', 'Deno', 'TypeORM', 'React with TypeScript', 'Next.js with TypeScript'],
      bestPractices: [
        'Define explicit types for better code clarity',
        'Use interfaces for object shapes and function signatures',
        'Leverage type unions and intersections for flexible typing',
        'Apply generics for reusable, type-safe code',
        'Enable strict mode in tsconfig.json',
        'Utilize type guards for runtime type checks'
      ],
      resources: [
        { name: 'TypeScript Documentation', url: 'https://www.typescriptlang.org/docs/' },
        { name: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/' },
        { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' }
      ]
    },
    {
      name: 'PHP',
      icon: 'php',
      description: 'Server-side scripting language designed primarily for web development',
      frameworks: ['Laravel', 'Symfony', 'CodeIgniter', 'Yii', 'CakePHP', 'WordPress'],
      bestPractices: [
        'Follow PSR standards for coding style',
        'Use namespaces to avoid naming collisions',
        'Implement composer for dependency management',
        'Apply object-oriented programming principles',
        'Use prepared statements to prevent SQL injection',
        'Employ environment variables for configuration'
      ],
      resources: [
        { name: 'PHP Documentation', url: 'https://www.php.net/docs.php' },
        { name: 'PHP The Right Way', url: 'https://phptherightway.com/' },
        { name: 'Laracasts', url: 'https://laracasts.com/' }
      ]
    },
    {
      name: 'Ruby',
      icon: 'gem',
      description: 'Dynamic, object-oriented language focused on simplicity and productivity',
      frameworks: ['Ruby on Rails', 'Sinatra', 'Hanami', 'Padrino', 'Grape', 'Goliath'],
      bestPractices: [
        'Follow the principle of "Convention over Configuration"',
        'Apply the DRY (Don\'t Repeat Yourself) principle',
        'Use blocks and procs for callback functionality',
        'Take advantage of Ruby\'s meta-programming capabilities',
        'Write readable code that resembles natural language',
        'Utilize gems for common functionality instead of reinventing the wheel'
      ],
      resources: [
        { name: 'Ruby Documentation', url: 'https://ruby-doc.org/' },
        { name: 'Ruby on Rails Guides', url: 'https://guides.rubyonrails.org/' },
        { name: 'Practical Object-Oriented Design in Ruby (Book)', url: 'https://www.poodr.com/' }
      ]
    },
    {
      name: 'Go',
      icon: 'google',
      description: 'Statically typed, compiled language designed for simplicity and efficiency',
      frameworks: ['Gin', 'Echo', 'Beego', 'Buffalo', 'Revel', 'Fiber'],
      bestPractices: [
        'Use error handling instead of exceptions',
        'Embrace interfaces for polymorphism',
        'Utilize goroutines for concurrent operations',
        'Apply the principle of "Accept interfaces, return structs"',
        'Use gofmt for standardized code formatting',
        'Keep functions and methods small and focused'
      ],
      resources: [
        { name: 'Go Documentation', url: 'https://golang.org/doc/' },
        { name: 'Go by Example', url: 'https://gobyexample.com/' },
        { name: 'The Go Programming Language (Book)', url: 'https://www.gopl.io/' }
      ]
    },
    {
      name: 'Rust',
      icon: 'rust',
      description: 'Systems language focusing on safety, speed, and concurrency without a garbage collector',
      frameworks: ['Rocket', 'Actix', 'Tokio', 'Yew', 'Diesel', 'Serde'],
      bestPractices: [
        'Leverage the ownership system to manage memory safely',
        'Use pattern matching for concise control flow',
        'Implement traits for polymorphism',
        'Apply the Result and Option types for error handling',
        'Utilize cargo for package management',
        'Write tests using the built-in testing framework'
      ],
      resources: [
        { name: 'The Rust Programming Language', url: 'https://doc.rust-lang.org/book/' },
        { name: 'Rust by Example', url: 'https://doc.rust-lang.org/rust-by-example/' },
        { name: 'Rustlings', url: 'https://github.com/rust-lang/rustlings/' }
      ]
    },
    {
      name: 'Swift',
      icon: 'apple',
      description: 'Modern, safe, and fast language for iOS, macOS, and other Apple platforms',
      frameworks: ['UIKit', 'SwiftUI', 'Combine', 'Core Data', 'Vapor', 'Perfect'],
      bestPractices: [
        'Use optionals to handle the absence of a value',
        'Apply protocol-oriented programming',
        'Utilize value types (structs) for most data models',
        'Implement extensions to add functionality',
        'Apply access control modifiers appropriately',
        'Use Swift\'s type inference when beneficial for readability'
      ],
      resources: [
        { name: 'Swift Documentation', url: 'https://swift.org/documentation/' },
        { name: 'Apple Developer Documentation', url: 'https://developer.apple.com/documentation/swift' },
        { name: 'Swift by Sundell', url: 'https://www.swiftbysundell.com/' }
      ]
    }
  ],
  
  // Code examples for common programming tasks
  codeExamples: [
    {
      title: 'REST API with Express.js',
      language: 'JavaScript',
      description: 'A simple REST API for a todo list with Express.js',
      code: `// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory database (for demonstration)
let todos = [
  { id: 1, title: 'Learn Express.js', completed: false },
  { id: 2, title: 'Build a REST API', completed: false }
];

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// GET a single todo
app.get('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(t => t.id === todoId);
  
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  res.json(todo);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const newTodo = { id: newId, title, completed: false };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo
app.put('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === todoId);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  const { title, completed } = req.body;
  const updatedTodo = {
    ...todos[todoIndex],
    ...(title && { title }),
    ...(completed !== undefined && { completed })
  };
  
  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === todoId);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  todos = todos.filter(t => t.id !== todoId);
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      explanation: `This code example demonstrates a simple REST API for a todo list application using Express.js. It includes:

1. Setup of an Express server with necessary middleware
2. In-memory array to store todos (in a real application, you would use a database)
3. Implementation of CRUD operations (Create, Read, Update, Delete)
4. Appropriate HTTP status codes and error handling
5. JSON response formatting

To run this code, you need to have Node.js installed and run:
\`\`\`
npm init -y
npm install express body-parser
node app.js
\`\`\`

After starting the server, you can test the API using tools like Postman or curl.`
    },
    {
      title: 'Python Flask API with SQLAlchemy',
      language: 'Python',
      description: 'RESTful API using Flask and SQLAlchemy for database operations',
      code: `from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    done = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'done': self.done,
            'created_at': self.created_at.isoformat()
        }

# Create tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/api/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get_or_404(task_id)
    return jsonify(task.to_dict())

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.json
    
    if not data.get('title'):
        return jsonify({'error': 'Title is required'}), 400
    
    new_task = Task(
        title=data.get('title'),
        description=data.get('description', ''),
        done=data.get('done', False)
    )
    
    db.session.add(new_task)
    db.session.commit()
    
    return jsonify(new_task.to_dict()), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.json
    
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'done' in data:
        task.done = data['done']
    
    db.session.commit()
    return jsonify(task.to_dict())

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)`,
      explanation: `This example demonstrates a RESTful API built with Flask and SQLAlchemy that manages a task list. The code features:

1. A Flask application with SQLAlchemy integration
2. A Task model class that maps to a database table
3. RESTful endpoints for CRUD operations
4. Data validation and error handling
5. SQLite database for persistent storage

To run this code, you'll need to:
\`\`\`
pip install flask flask-sqlalchemy
python app.py
\`\`\`

The application will create a SQLite database file in your project directory. You can interact with the API using tools like Postman or curl.`
    },
    {
      title: 'React Component with Hooks',
      language: 'JavaScript',
      description: 'React functional component using useState and useEffect hooks',
      code: `import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ userId }) => {
  // State hooks
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });

  // Effect hook to fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // In a real app, replace with your actual API endpoint
        const response = await fetch(\`https://api.example.com/users/\${userId}\`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          bio: userData.bio || ''
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      // In a real app, replace with your actual API endpoint
      const response = await fetch(\`https://api.example.com/users/\${userId}\`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading && !user) {
    return <div className="loading">Loading profile...</div>;
  }

  // Render error state
  if (error && !user) {
    return <div className="error">Error: {error}</div>;
  }

  // Render user profile
  return (
    <div className="user-profile">
      {editing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              onClick={() => setEditing(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
          
          {error && <div className="error">Error: {error}</div>}
        </form>
      ) : (
        <div className="profile-view">
          <div className="profile-header">
            <h2>{user.name}</h2>
            <button onClick={() => setEditing(true)} className="edit-button">
              Edit Profile
            </button>
          </div>
          
          <div className="profile-info">
            <p className="email">{user.email}</p>
            <p className="bio">{user.bio || 'No bio provided.'}</p>
          </div>
          
          <div className="profile-meta">
            <div className="meta-item">
              <span className="meta-label">Member since:</span>
              <span className="meta-value">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Last login:</span>
              <span className="meta-value">
                {new Date(user.lastLogin).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;`,
      explanation: `This React component demonstrates a user profile page with both view and edit modes. Key features include:

1. Functional component with React Hooks (useState, useEffect)
2. State management for user data, loading states, and form data
3. API data fetching with error handling
4. Conditional rendering for different states (loading, error, editing)
5. Form validation and submission
6. Reusable form components with proper accessibility attributes

The component handles a complete user flow:
- Fetches user data when mounted or when userId changes
- Displays user profile information
- Allows editing via a form interface
- Submits updates to an API
- Handles loading states and errors

To use this component, you would import it in another component like:
\`\`\`jsx
<UserProfile userId="123" />
\`\`\`

Note: The API endpoints in this example are placeholders. You should replace them with your actual API URLs.`
    },
    {
      title: 'Java Spring Boot REST Controller',
      language: 'Java',
      description: 'REST API controller with Spring Boot',
      code: `package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import com.example.taskmanager.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Get all tasks
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.findAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    // Get task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable(value = "id") Long taskId) {
        Task task = taskService.findTaskById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    // Create a new task
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        Task createdTask = taskService.saveTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    // Update an existing task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable(value = "id") Long taskId,
            @Valid @RequestBody Task taskDetails) {
        
        Task task = taskService.findTaskById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));
        
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setCompleted(taskDetails.isCompleted());
        task.setDueDate(taskDetails.getDueDate());
        
        Task updatedTask = taskService.saveTask(task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable(value = "id") Long taskId) {
        Task task = taskService.findTaskById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));
        
        taskService.deleteTask(task);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Mark task as completed
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> markTaskAsCompleted(@PathVariable(value = "id") Long taskId) {
        Task task = taskService.findTaskById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));
        
        task.setCompleted(true);
        Task updatedTask = taskService.saveTask(task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    // Get tasks by completion status
    @GetMapping("/status/{completed}")
    public ResponseEntity<List<Task>> getTasksByStatus(@PathVariable(value = "completed") boolean completed) {
        List<Task> tasks = taskService.findTasksByCompletionStatus(completed);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
}`,
      explanation: `This code demonstrates a Spring Boot REST controller for a task management API. Key features include:

1. RESTful endpoint definitions using Spring annotations
2. Dependency injection with @Autowired for the TaskService
3. CRUD operations (Create, Read, Update, Delete) for tasks
4. Proper HTTP status codes and ResponseEntity usage
5. Exception handling for resource not found scenarios
6. Input validation with @Valid annotation
7. Additional endpoint for filtering tasks by completion status

This controller would typically be part of a larger Spring Boot application with:
- A Task model class with fields like id, title, description, completed, and dueDate
- A TaskService interface and implementation that handles business logic
- A custom ResourceNotFoundException class
- Spring Data JPA repositories for database operations

To use this controller, you would need to set up a proper Spring Boot application with the appropriate dependencies (spring-boot-starter-web, spring-boot-starter-data-jpa, etc.) and configuration.`
    },
    {
      title: 'Basic Data Structures in Python',
      language: 'Python',
      description: 'Implementation of common data structures in Python',
      code: `class Stack:
    """A simple Stack implementation using a Python list."""
    
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add an item to the top of the stack."""
        self.items.append(item)
    
    def pop(self):
        """Remove and return the top item from the stack."""
        if self.is_empty():
            raise IndexError("Pop from an empty stack")
        return self.items.pop()
    
    def peek(self):
        """Return the top item without removing it."""
        if self.is_empty():
            raise IndexError("Peek from an empty stack")
        return self.items[-1]
    
    def is_empty(self):
        """Check if the stack is empty."""
        return len(self.items) == 0
    
    def size(self):
        """Return the number of items in the stack."""
        return len(self.items)
    
    def __str__(self):
        """String representation of the stack."""
        return str(self.items)


class Queue:
    """A simple Queue implementation using a Python list."""
    
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        """Add an item to the end of the queue."""
        self.items.append(item)
    
    def dequeue(self):
        """Remove and return the front item from the queue."""
        if self.is_empty():
            raise IndexError("Dequeue from an empty queue")
        return self.items.pop(0)  # Not efficient for large queues
    
    def peek(self):
        """Return the front item without removing it."""
        if self.is_empty():
            raise IndexError("Peek from an empty queue")
        return self.items[0]
    
    def is_empty(self):
        """Check if the queue is empty."""
        return len(self.items) == 0
    
    def size(self):
        """Return the number of items in the queue."""
        return len(self.items)
    
    def __str__(self):
        """String representation of the queue."""
        return str(self.items)


class Node:
    """A node in a linked list."""
    
    def __init__(self, data):
        self.data = data
        self.next = None
    
    def __str__(self):
        """String representation of the node."""
        return str(self.data)


class LinkedList:
    """A simple singly linked list implementation."""
    
    def __init__(self):
        self.head = None
    
    def is_empty(self):
        """Check if the linked list is empty."""
        return self.head is None
    
    def append(self, data):
        """Add a new node with the given data to the end of the list."""
        new_node = Node(data)
        
        if self.head is None:
            self.head = new_node
            return
        
        current = self.head
        while current.next:
            current = current.next
        
        current.next = new_node
    
    def prepend(self, data):
        """Add a new node with the given data to the beginning of the list."""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def delete(self, data):
        """Delete the first occurrence of a node with the given data."""
        if self.is_empty():
            return
        
        if self.head.data == data:
            self.head = self.head.next
            return
        
        current = self.head
        while current.next and current.next.data != data:
            current = current.next
        
        if current.next:
            current.next = current.next.next
    
    def search(self, data):
        """Search for a node with the given data."""
        current = self.head
        while current:
            if current.data == data:
                return True
            current = current.next
        return False
    
    def size(self):
        """Return the number of nodes in the list."""
        count = 0
        current = self.head
        while current:
            count += 1
            current = current.next
        return count
    
    def __str__(self):
        """String representation of the linked list."""
        if self.is_empty():
            return "[]"
        
        result = []
        current = self.head
        while current:
            result.append(str(current.data))
            current = current.next
        
        return "[" + " -> ".join(result) + "]"


# Example usage
if __name__ == "__main__":
    # Stack example
    print("Stack Example:")
    stack = Stack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print(f"Stack: {stack}")
    print(f"Pop: {stack.pop()}")
    print(f"Stack after pop: {stack}")
    print(f"Peek: {stack.peek()}")
    print(f"Size: {stack.size()}")
    print()
    
    # Queue example
    print("Queue Example:")
    queue = Queue()
    queue.enqueue("A")
    queue.enqueue("B")
    queue.enqueue("C")
    print(f"Queue: {queue}")
    print(f"Dequeue: {queue.dequeue()}")
    print(f"Queue after dequeue: {queue}")
    print(f"Peek: {queue.peek()}")
    print(f"Size: {queue.size()}")
    print()
    
    # Linked List example
    print("Linked List Example:")
    linked_list = LinkedList()
    linked_list.append(10)
    linked_list.append(20)
    linked_list.prepend(5)
    print(f"Linked List: {linked_list}")
    print(f"Search for 20: {linked_list.search(20)}")
    print(f"Search for 30: {linked_list.search(30)}")
    linked_list.delete(20)
    print(f"After deleting 20: {linked_list}")
    print(f"Size: {linked_list.size()}")`,
      explanation: `This code demonstrates implementations of three fundamental data structures in Python:

1. **Stack**: A Last-In-First-Out (LIFO) data structure with push, pop, and peek operations.
   - Uses a Python list for storage with O(1) amortized time complexity for push and pop.

2. **Queue**: A First-In-First-Out (FIFO) data structure with enqueue and dequeue operations.
   - Uses a Python list, but note that dequeue operations are O(n) due to the list's implementation.
   - For more efficient queues, consider using `collections.deque` from Python's standard library.

3. **Linked List**: A sequence of nodes where each node points to the next node.
   - Implements common operations: append, prepend, delete, search, and size.
   - Demonstrates the node-based approach to data structures.

The code includes thorough documentation, error handling, and a demonstration of each data structure's usage. The implementation is educational in nature – in production code, you might use Python's built-in collections (lists, deque) or third-party libraries for optimized performance.

These implementations can serve as a foundation for understanding more complex data structures like binary trees, graphs, and hash tables.`
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="code-assistant-interface">
      <div class="code-header">
        <div class="code-icon">
          <i class="fas fa-code"></i>
        </div>
        <div class="code-title">
          <h2>Code Assistant</h2>
          <p>Programming support across multiple languages</p>
        </div>
      </div>
      
      <div class="languages-overview">
        <div class="section-header">
          <h3>Supported Languages</h3>
          <p>Select a language to see specific information and best practices</p>
        </div>
        
        <div class="language-grid">
          <!-- Language cards will be dynamically generated -->
        </div>
      </div>
      
      <div class="language-details hidden" id="language-details">
        <div class="language-details-header">
          <h3 id="selected-language">JavaScript</h3>
          <button id="back-to-languages" class="back-button">
            <i class="fas fa-arrow-left"></i> Back to Languages
          </button>
        </div>
        
        <div class="language-description" id="language-description">
          <!-- Language description will be loaded here -->
        </div>
        
        <div class="frameworks-section">
          <h4>Popular Frameworks & Libraries</h4>
          <div class="framework-tags" id="framework-tags">
            <!-- Frameworks will be loaded here -->
          </div>
        </div>
        
        <div class="best-practices-section">
          <h4>Best Practices</h4>
          <ul class="practice-list" id="practice-list">
            <!-- Best practices will be loaded here -->
          </ul>
        </div>
        
        <div class="resources-section">
          <h4>Learning Resources</h4>
          <div class="resource-links" id="resource-links">
            <!-- Resources will be loaded here -->
          </div>
        </div>
      </div>
      
      <div class="code-examples">
        <div class="section-header">
          <h3>Code Examples</h3>
          <p>Reference implementations for common programming tasks</p>
        </div>
        
        <div class="examples-list">
          <!-- Example cards will be dynamically generated -->
        </div>
      </div>
      
      <div class="code-playground">
        <div class="section-header">
          <h3>Code Playground</h3>
          <p>Ask for code generation, explanation, or debugging help</p>
        </div>
        
        <div class="playground-options">
          <button class="option-button" data-prompt="generate">
            <i class="fas fa-magic"></i>
            <span>Generate Code</span>
          </button>
          
          <button class="option-button" data-prompt="explain">
            <i class="fas fa-lightbulb"></i>
            <span>Explain Code</span>
          </button>
          
          <button class="option-button" data-prompt="debug">
            <i class="fas fa-bug"></i>
            <span>Debug Code</span>
          </button>
          
          <button class="option-button" data-prompt="optimize">
            <i class="fas fa-tachometer-alt"></i>
            <span>Optimize Code</span>
          </button>
        </div>
        
        <div class="playground-templates hidden" id="playground-templates">
          <div class="templates-header">
            <h4 id="template-title">Generate Code</h4>
            <button id="back-to-options" class="back-button">
              <i class="fas fa-arrow-left"></i> Back to Options
            </button>
          </div>
          
          <div class="template-form" id="generate-template">
            <div class="form-group">
              <label for="generation-language">Programming Language</label>
              <select id="generation-language">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="typescript">TypeScript</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="swift">Swift</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="generation-task">What would you like to generate?</label>
              <input type="text" id="generation-task" placeholder="e.g., A function to sort an array of objects by a specific property">
            </div>
            
            <div class="form-group">
              <label for="generation-details">Additional details (optional)</label>
              <textarea id="generation-details" placeholder="Provide any specific requirements, constraints, or context that might be helpful"></textarea>
            </div>
            
            <button id="submit-generation" class="primary-button">Generate Code</button>
          </div>
          
          <div class="template-form hidden" id="explain-template">
            <div class="form-group">
              <label for="explanation-language">Programming Language</label>
              <select id="explanation-language">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="typescript">TypeScript</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="swift">Swift</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="explanation-code">Code to Explain</label>
              <textarea id="explanation-code" placeholder="Paste the code you want explained"></textarea>
            </div>
            
            <div class="form-group">
              <label for="explanation-level">Explanation Detail Level</label>
              <select id="explanation-level">
                <option value="beginner">Beginner - Explain every detail</option>
                <option value="intermediate" selected>Intermediate - Balance between detail and brevity</option>
                <option value="advanced">Advanced - Focus on complex aspects</option>
              </select>
            </div>
            
            <button id="submit-explanation" class="primary-button">Explain Code</button>
          </div>
          
          <div class="template-form hidden" id="debug-template">
            <div class="form-group">
              <label for="debug-language">Programming Language</label>
              <select id="debug-language">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="typescript">TypeScript</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="swift">Swift</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="debug-code">Code with Issues</label>
              <textarea id="debug-code" placeholder="Paste the code that needs debugging"></textarea>
            </div>
            
            <div class="form-group">
              <label for="debug-error">Error Messages (if any)</label>
              <textarea id="debug-error" placeholder="Paste any error messages you're receiving (optional)"></textarea>
            </div>
            
            <div class="form-group">
              <label for="debug-context">Context & Expected Behavior</label>
              <textarea id="debug-context" placeholder="Describe what the code should do and any specific issues you're encountering"></textarea>
            </div>
            
            <button id="submit-debug" class="primary-button">Debug Code</button>
          </div>
          
          <div class="template-form hidden" id="optimize-template">
            <div class="form-group">
              <label for="optimize-language">Programming Language</label>
              <select id="optimize-language">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="typescript">TypeScript</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="swift">Swift</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="optimize-code">Code to Optimize</label>
              <textarea id="optimize-code" placeholder="Paste the code you want to optimize"></textarea>
            </div>
            
            <div class="form-group">
              <label for="optimize-focus">Optimization Focus</label>
              <select id="optimize-focus">
                <option value="performance">Performance - Make it faster</option>
                <option value="readability">Readability - Make it cleaner and more maintainable</option>
                <option value="memory">Memory Usage - Reduce resource consumption</option>
                <option value="all" selected>All - Balance between performance, readability, and resources</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="optimize-context">Additional Context (optional)</label>
              <textarea id="optimize-context" placeholder="Describe any specific constraints or requirements for the optimization"></textarea>
            </div>
            
            <button id="submit-optimize" class="primary-button">Optimize Code</button>
          </div>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .code-assistant-interface {
      background: linear-gradient(to bottom right, rgba(8, 145, 178, 0.1), rgba(14, 116, 144, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(8, 145, 178, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .code-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .code-icon {
      font-size: 2.5rem;
      color: #0891b2;
      margin-right: 1rem;
    }
    
    .code-title h2 {
      color: #0891b2;
      margin-bottom: 0.3rem;
    }
    
    .code-title p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .section-header {
      margin-bottom: 1.25rem;
    }
    
    .section-header h3 {
      color: #f3f4f6;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    
    .section-header p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .languages-overview, .language-details, .code-examples, .code-playground {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Language Grid */
    .language-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
    
    .language-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .language-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(8, 145, 178, 0.3);
    }
    
    .language-icon {
      font-size: 2rem;
      color: #0891b2;
    }
    
    .language-name {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
    }
    
    /* Language Details */
    .language-details-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }
    
    .language-details-header h3 {
      color: #f3f4f6;
      font-size: 1.2rem;
    }
    
    .back-button {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .back-button:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .language-description {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      color: #e2e8f0;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
    }
    
    .frameworks-section, .best-practices-section, .resources-section {
      margin-bottom: 1.25rem;
    }
    
    .frameworks-section h4, .best-practices-section h4, .resources-section h4 {
      color: #f3f4f6;
      font-size: 1.05rem;
      margin-bottom: 0.75rem;
    }
    
    .framework-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .framework-tag {
      background: rgba(8, 145, 178, 0.15);
      color: #22d3ee;
      padding: 0.4rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }
    
    .practice-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .practice-item {
      padding-left: 1.5rem;
      position: relative;
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .practice-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #0891b2;
    }
    
    .resource-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .resource-link {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 6px;
      padding: 0.75rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    
    .resource-link:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .resource-link i {
      color: #0891b2;
    }
    
    /* Code Examples */
    .examples-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .example-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .example-card:hover {
      transform: translateY(-3px);
      border-color: rgba(8, 145, 178, 0.3);
    }
    
    .example-header {
      background: rgba(8, 145, 178, 0.15);
      padding: 1rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.3);
    }
    
    .example-title {
      color: #e2e8f0;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .example-language {
      color: #22d3ee;
      font-size: 0.85rem;
    }
    
    .example-description {
      padding: 1rem;
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    /* Code Playground */
    .playground-options {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .option-button {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .option-button:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(8, 145, 178, 0.3);
    }
    
    .option-button i {
      font-size: 1.75rem;
      color: #0891b2;
    }
    
    .option-button span {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
    }
    
    .templates-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }
    
    .templates-header h4 {
      color: #f3f4f6;
      font-size: 1.1rem;
    }
    
    .template-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .form-group label {
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    .form-group input, .form-group select, .form-group textarea {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 6px;
      padding: 0.75rem;
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    .form-group textarea {
      min-height: 120px;
      resize: vertical;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    }
    
    .primary-button {
      background: #0891b2;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      align-self: flex-start;
      margin-top: 0.5rem;
    }
    
    .primary-button:hover {
      background: #0e7490;
      transform: translateY(-2px);
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Current state
  currentState: {
    selectedLanguage: null
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Code Assistant Mode');
    
    // Add the mode's CSS to the document
    this.addStyles();
    
    // If the mode's special interface container exists, render the interface
    const modeContainer = document.getElementById('modeSpecificUI');
    if (modeContainer) {
      this.renderUI(modeContainer);
    }
    
    // If the chat input exists, set a default message placeholder
    const chatInput = document.getElementById('messageInput');
    if (chatInput) {
      chatInput.placeholder = "Ask about code, programming concepts, or debugging help...";
    }
    
    return this;
  },
  
  // Add the mode's CSS to the document
  addStyles: function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = this.styles;
    document.head.appendChild(styleElement);
  },
  
  // Render the mode's UI
  renderUI: function(container) {
    // Insert the HTML template
    container.innerHTML = this.template;
    
    // Populate language cards
    this.populateLanguageCards(container);
    
    // Populate example cards
    this.populateExampleCards(container);
    
    // Add event listeners
    this.addEventListeners(container);
  },
  
  // Populate language cards
  populateLanguageCards: function(container) {
    const languageGrid = container.querySelector('.language-grid');
    if (!languageGrid) return;
    
    // Clear existing content
    languageGrid.innerHTML = '';
    
    // Add language cards
    this.languages.forEach(language => {
      // Determine icon class
      let iconClass = 'fa-code';
      switch (language.icon) {
        case 'js': iconClass = 'fa-js-square'; break;
        case 'python': iconClass = 'fa-python'; break;
        case 'java': iconClass = 'fa-java'; break;
        case 'microsoft': iconClass = 'fa-microsoft'; break;
        case 'ts': iconClass = 'fa-js-square'; break;  // Using JS icon for TypeScript
        case 'php': iconClass = 'fa-php'; break;
        case 'gem': iconClass = 'fa-gem'; break;  // Using gem icon for Ruby
        case 'google': iconClass = 'fa-google'; break;  // Using Google icon for Go
        case 'rust': iconClass = 'fa-cogs'; break;  // Using cogs icon for Rust
        case 'apple': iconClass = 'fa-apple'; break;
      }
      
      const card = document.createElement('div');
      card.className = 'language-card';
      card.dataset.language = language.name.toLowerCase();
      card.innerHTML = `
        <div class="language-icon">
          <i class="fab ${iconClass}"></i>
        </div>
        <div class="language-name">${language.name}</div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.showLanguageDetails(container, language.name.toLowerCase());
      });
      
      languageGrid.appendChild(card);
    });
  },
  
  // Populate example cards
  populateExampleCards: function(container) {
    const examplesList = container.querySelector('.examples-list');
    if (!examplesList) return;
    
    // Clear existing content
    examplesList.innerHTML = '';
    
    // Add example cards
    this.codeExamples.forEach(example => {
      const card = document.createElement('div');
      card.className = 'example-card';
      card.innerHTML = `
        <div class="example-header">
          <div class="example-title">${example.title}</div>
          <div class="example-language">${example.language}</div>
        </div>
        <div class="example-description">${example.description}</div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.showCodeExample(example);
      });
      
      examplesList.appendChild(card);
    });
  },
  
  // Add event listeners
  addEventListeners: function(container) {
    // Back to languages button
    const backButton = container.querySelector('#back-to-languages');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.hideLanguageDetails(container);
      });
    }
    
    // Option buttons in the playground
    const optionButtons = container.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const promptType = button.dataset.prompt;
        this.showPromptTemplate(container, promptType);
      });
    });
    
    // Back to options button
    const backToOptionsButton = container.querySelector('#back-to-options');
    if (backToOptionsButton) {
      backToOptionsButton.addEventListener('click', () => {
        this.hidePromptTemplate(container);
      });
    }
    
    // Submit buttons for each template
    const submitGenerationButton = container.querySelector('#submit-generation');
    if (submitGenerationButton) {
      submitGenerationButton.addEventListener('click', () => {
        this.handleGenerationSubmit(container);
      });
    }
    
    const submitExplanationButton = container.querySelector('#submit-explanation');
    if (submitExplanationButton) {
      submitExplanationButton.addEventListener('click', () => {
        this.handleExplanationSubmit(container);
      });
    }
    
    const submitDebugButton = container.querySelector('#submit-debug');
    if (submitDebugButton) {
      submitDebugButton.addEventListener('click', () => {
        this.handleDebugSubmit(container);
      });
    }
    
    const submitOptimizeButton = container.querySelector('#submit-optimize');
    if (submitOptimizeButton) {
      submitOptimizeButton.addEventListener('click', () => {
        this.handleOptimizeSubmit(container);
      });
    }
  },
  
  // Show language details
  showLanguageDetails: function(container, languageName) {
    // Update current state
    this.currentState.selectedLanguage = languageName;
    
    // Show language details
    const languageDetails = container.querySelector('#language-details');
    if (languageDetails) {
      languageDetails.classList.remove('hidden');
    }
    
    // Hide language overview
    const languageOverview = container.querySelector('.languages-overview');
    if (languageOverview) {
      languageOverview.style.display = 'none';
    }
    
    // Find language data (case-insensitive match)
    const language = this.languages.find(l => l.name.toLowerCase() === languageName);
    if (!language) return;
    
    // Update language name
    const selectedLanguage = container.querySelector('#selected-language');
    if (selectedLanguage) {
      selectedLanguage.textContent = language.name;
    }
    
    // Update language description
    const languageDescription = container.querySelector('#language-description');
    if (languageDescription) {
      languageDescription.textContent = language.description;
    }
    
    // Update frameworks
    const frameworkTags = container.querySelector('#framework-tags');
    if (frameworkTags) {
      frameworkTags.innerHTML = '';
      language.frameworks.forEach(framework => {
        const tag = document.createElement('div');
        tag.className = 'framework-tag';
        tag.textContent = framework;
        frameworkTags.appendChild(tag);
      });
    }
    
    // Update best practices
    const practiceList = container.querySelector('#practice-list');
    if (practiceList) {
      practiceList.innerHTML = '';
      language.bestPractices.forEach(practice => {
        const item = document.createElement('li');
        item.className = 'practice-item';
        item.textContent = practice;
        practiceList.appendChild(item);
      });
    }
    
    // Update resources
    const resourceLinks = container.querySelector('#resource-links');
    if (resourceLinks) {
      resourceLinks.innerHTML = '';
      language.resources.forEach(resource => {
        const link = document.createElement('a');
        link.className = 'resource-link';
        link.href = resource.url;
        link.target = '_blank';
        link.innerHTML = `
          <i class="fas fa-external-link-alt"></i>
          <span>${resource.name}</span>
        `;
        resourceLinks.appendChild(link);
      });
    }
  },
  
  // Hide language details
  hideLanguageDetails: function(container) {
    // Reset current state
    this.currentState.selectedLanguage = null;
    
    // Hide language details
    const languageDetails = container.querySelector('#language-details');
    if (languageDetails) {
      languageDetails.classList.add('hidden');
    }
    
    // Show language overview
    const languageOverview = container.querySelector('.languages-overview');
    if (languageOverview) {
      languageOverview.style.display = 'block';
    }
  },
  
  // Show code example
  showCodeExample: function(example) {
    // Create prompt for AI
    const prompt = `Please explain this ${example.language} code example for ${example.title}:

\`\`\`${example.language.toLowerCase()}
${example.code}
\`\`\`

In your response, include:
1. A step-by-step explanation of how the code works
2. Key concepts and techniques used in the implementation
3. Any notable design patterns or best practices demonstrated
4. Potential improvements or alternatives (if applicable)

Please be thorough but concise in your explanation.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Show prompt template
  showPromptTemplate: function(container, promptType) {
    // Hide option buttons
    const playgroundOptions = container.querySelector('.playground-options');
    if (playgroundOptions) {
      playgroundOptions.style.display = 'none';
    }
    
    // Show templates container
    const templatesContainer = container.querySelector('#playground-templates');
    if (templatesContainer) {
      templatesContainer.classList.remove('hidden');
    }
    
    // Update template title
    const templateTitle = container.querySelector('#template-title');
    if (templateTitle) {
      switch (promptType) {
        case 'generate': templateTitle.textContent = 'Generate Code'; break;
        case 'explain': templateTitle.textContent = 'Explain Code'; break;
        case 'debug': templateTitle.textContent = 'Debug Code'; break;
        case 'optimize': templateTitle.textContent = 'Optimize Code'; break;
      }
    }
    
    // Show the appropriate template form and hide others
    const generateTemplate = container.querySelector('#generate-template');
    const explainTemplate = container.querySelector('#explain-template');
    const debugTemplate = container.querySelector('#debug-template');
    const optimizeTemplate = container.querySelector('#optimize-template');
    
    if (generateTemplate) generateTemplate.classList.add('hidden');
    if (explainTemplate) explainTemplate.classList.add('hidden');
    if (debugTemplate) debugTemplate.classList.add('hidden');
    if (optimizeTemplate) optimizeTemplate.classList.add('hidden');
    
    switch (promptType) {
      case 'generate':
        if (generateTemplate) generateTemplate.classList.remove('hidden');
        break;
      case 'explain':
        if (explainTemplate) explainTemplate.classList.remove('hidden');
        break;
      case 'debug':
        if (debugTemplate) debugTemplate.classList.remove('hidden');
        break;
      case 'optimize':
        if (optimizeTemplate) optimizeTemplate.classList.remove('hidden');
        break;
    }
  },
  
  // Hide prompt template
  hidePromptTemplate: function(container) {
    // Show option buttons
    const playgroundOptions = container.querySelector('.playground-options');
    if (playgroundOptions) {
      playgroundOptions.style.display = 'grid';
    }
    
    // Hide templates container
    const templatesContainer = container.querySelector('#playground-templates');
    if (templatesContainer) {
      templatesContainer.classList.add('hidden');
    }
  },
  
  // Handle generation form submission
  handleGenerationSubmit: function(container) {
    const languageSelect = container.querySelector('#generation-language');
    const taskInput = container.querySelector('#generation-task');
    const detailsTextarea = container.querySelector('#generation-details');
    
    if (!languageSelect || !taskInput) return;
    
    const language = languageSelect.value;
    const task = taskInput.value.trim();
    const details = detailsTextarea ? detailsTextarea.value.trim() : '';
    
    if (!task) {
      alert('Please describe what code you would like to generate.');
      return;
    }
    
    // Create prompt for AI
    let prompt = `Please generate ${language} code for the following task:

Task: ${task}`;

    if (details) {
      prompt += `\n\nAdditional details:\n${details}`;
    }

    prompt += `\n\nPlease provide:
1. Clean, well-documented code that accomplishes the task
2. A brief explanation of how the code works
3. Any assumptions you made in your implementation
4. Instructions for using the code (if applicable)

Format your response with the code in a proper code block with language highlighting.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
    
    // Reset form
    this.hidePromptTemplate(container);
  },
  
  // Handle explanation form submission
  handleExplanationSubmit: function(container) {
    const languageSelect = container.querySelector('#explanation-language');
    const codeTextarea = container.querySelector('#explanation-code');
    const levelSelect = container.querySelector('#explanation-level');
    
    if (!languageSelect || !codeTextarea || !levelSelect) return;
    
    const language = languageSelect.value;
    const code = codeTextarea.value.trim();
    const level = levelSelect.value;
    
    if (!code) {
      alert('Please paste the code you want explained.');
      return;
    }
    
    // Create prompt for AI
    let prompt = `Please explain this ${language} code at a ${level} level:

\`\`\`${language}
${code}
\`\`\``;

    switch (level) {
      case 'beginner':
        prompt += `\n\nSince I'm at a beginner level, please:
1. Break down every line in detail
2. Explain all concepts, functions, and syntax
3. Use simple language and avoid complex jargon
4. Include analogies where helpful
5. Assume I have minimal programming knowledge`;
        break;
      case 'intermediate':
        prompt += `\n\nAs an intermediate programmer, please:
1. Provide a balanced explanation of the code
2. Focus on the main logic and important features
3. Briefly explain any notable syntax or concepts
4. Highlight any best practices or potential issues
5. Assume I have general programming knowledge but might not be familiar with all aspects of ${language}`;
        break;
      case 'advanced':
        prompt += `\n\nAs an advanced programmer, please:
1. Focus on high-level design decisions and patterns
2. Concentrate on complex or non-obvious aspects of the code
3. Discuss efficiency, edge cases, and potential improvements
4. Compare with alternative approaches where relevant
5. Assume I have strong programming knowledge and ${language} experience`;
        break;
    }
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
    
    // Reset form
    this.hidePromptTemplate(container);
  },
  
  // Handle debug form submission
  handleDebugSubmit: function(container) {
    const languageSelect = container.querySelector('#debug-language');
    const codeTextarea = container.querySelector('#debug-code');
    const errorTextarea = container.querySelector('#debug-error');
    const contextTextarea = container.querySelector('#debug-context');
    
    if (!languageSelect || !codeTextarea) return;
    
    const language = languageSelect.value;
    const code = codeTextarea.value.trim();
    const error = errorTextarea ? errorTextarea.value.trim() : '';
    const context = contextTextarea ? contextTextarea.value.trim() : '';
    
    if (!code) {
      alert('Please paste the code you want to debug.');
      return;
    }
    
    // Create prompt for AI
    let prompt = `Please help me debug this ${language} code:

\`\`\`${language}
${code}
\`\`\``;

    if (error) {
      prompt += `\n\nI'm receiving the following error message(s):\n${error}`;
    }

    if (context) {
      prompt += `\n\nContext and expected behavior:\n${context}`;
    }

    prompt += `\n\nPlease:
1. Identify the issues in the code
2. Explain why these issues are occurring
3. Provide a corrected version of the code
4. Explain what changes you made and why they fix the problem
5. Suggest any additional improvements or best practices`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
    
    // Reset form
    this.hidePromptTemplate(container);
  },
  
  // Handle optimize form submission
  handleOptimizeSubmit: function(container) {
    const languageSelect = container.querySelector('#optimize-language');
    const codeTextarea = container.querySelector('#optimize-code');
    const focusSelect = container.querySelector('#optimize-focus');
    const contextTextarea = container.querySelector('#optimize-context');
    
    if (!languageSelect || !codeTextarea || !focusSelect) return;
    
    const language = languageSelect.value;
    const code = codeTextarea.value.trim();
    const focus = focusSelect.value;
    const context = contextTextarea ? contextTextarea.value.trim() : '';
    
    if (!code) {
      alert('Please paste the code you want to optimize.');
      return;
    }
    
    // Create prompt for AI
    let prompt = `Please optimize this ${language} code with a focus on ${focus === 'all' ? 'overall improvement' : focus}:

\`\`\`${language}
${code}
\`\`\``;

    if (context) {
      prompt += `\n\nAdditional context:\n${context}`;
    }

    switch (focus) {
      case 'performance':
        prompt += `\n\nPlease focus on performance optimization by:
1. Identifying performance bottlenecks
2. Reducing time complexity where possible
3. Minimizing unnecessary operations
4. Optimizing algorithms and data structures
5. Suggesting language-specific performance techniques`;
        break;
      case 'readability':
        prompt += `\n\nPlease focus on improving readability and maintainability by:
1. Restructuring for clarity and simplicity
2. Adding appropriate comments and documentation
3. Improving naming conventions
4. Applying consistent code style
5. Breaking down complex blocks into simpler functions`;
        break;
      case 'memory':
        prompt += `\n\nPlease focus on memory optimization by:
1. Reducing memory allocations and deallocations
2. Identifying and fixing memory leaks (if applicable)
3. Using more memory-efficient data structures
4. Optimizing variable scope and lifetime
5. Suggesting language-specific memory optimization techniques`;
        break;
      case 'all':
        prompt += `\n\nPlease provide a balanced optimization by:
1. Improving performance where it doesn't sacrifice readability
2. Enhancing readability and maintainability
3. Optimizing memory usage where appropriate
4. Applying language-specific best practices
5. Explaining the tradeoffs made in your optimization`;
        break;
    }

    prompt += `\n\nPlease provide:
1. The optimized code
2. An explanation of the changes made
3. The benefits of each major change
4. Any trade-offs involved in your optimization choices`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
    
    // Reset form
    this.hidePromptTemplate(container);
  },
  
  // Send prompt to AI
  sendPromptToAI: function(prompt) {
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = prompt;
      sendButton.click();
    }
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    CodeAssistantMode.init();
  } else {
    window.addEventListener('load', function() {
      CodeAssistantMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CodeAssistantMode;
} else {
  window.CodeAssistantMode = CodeAssistantMode;
}