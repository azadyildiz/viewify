# Viewify - Data Analysis Tool

A high-performance, client-side data analysis tool for XML, JSON, and CSV files. Built with Next.js, TypeScript, and modern React patterns.

## 👨‍💻 Developer

**Viewify** is developed by **[Azad Yıldız](https://github.com/azadyildiz/)**, a passionate software developer focused on creating efficient, user-friendly web applications.

- **GitHub**: [@azadyildiz](https://github.com/azadyildiz/)
- **LinkedIn**: [Azad Yıldız](https://www.linkedin.com/in/azadyildiz/)
- **Website**: [viewify.co](https://viewify.co)

## 🌟 About the Project

This open-source project aims to provide developers and data analysts with a powerful, privacy-focused tool for analyzing large data files directly in their browser. All processing happens client-side, ensuring complete data privacy and security.

## 🚀 Features

- **Multi-format Support**: Analyze XML, JSON, and CSV files
- **Client-side Processing**: All data processing happens in the browser for privacy
- **Advanced Filtering**: Search, conditional filters, and field visibility controls
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Preview**: Preview files before analysis
- **Error Handling**: Comprehensive error handling with user-friendly notifications
- **Performance Optimized**: Efficient parsing and rendering for large datasets

## 🏗️ Architecture

### Core Components

- **Data Source Form** (`data-source-form.tsx`): File upload and configuration
- **Data Viewer** (`data-viewer.tsx`): Main data display and interaction
- **Item Card** (`item-card.tsx`): Individual data item display
- **Filter Section** (`filter-section.tsx`): Advanced filtering controls
- **Error Boundary** (`error-boundary.tsx`): Global error handling

### State Management

- **useDataProcessor Hook**: Centralized data processing and state management
- **Reducer Pattern**: Predictable state updates with clear actions
- **Local UI State**: Component-specific state for dialogs and expansions

### Error Handling

- **Try-Catch Blocks**: Comprehensive error handling throughout the application
- **Toast Notifications**: User-friendly error messages using toast system
- **Validation**: File upload and content validation
- **Error Boundary**: React error boundary for unexpected errors

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: Radix UI components
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useReducer + custom hooks
- **Error Handling**: Custom error boundary + toast notifications

## 📁 Project Structure

```
client/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with error boundary
│   ├── page.tsx           # Landing page
│   └── viewer/            # Main application
│       └── page.tsx       # Data viewer page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── data-source-form.tsx
│   ├── data-viewer.tsx
│   ├── item-card.tsx
│   ├── filter-section.tsx
│   ├── error-boundary.tsx
│   └── ...               # Other components
├── hooks/                # Custom React hooks
│   ├── use-data-processor.ts
│   ├── use-toast.ts
│   └── use-mobile.tsx
├── lib/                  # Utility functions
│   ├── utils.ts
│   ├── performance-utils.ts
│   ├── error-utils.ts
│   ├── types.ts
│   └── sample-data.ts
└── styles/               # Global styles
```

## 🔧 Key Features

### Data Processing
- **XML Parsing**: Recursive parsing of nested XML elements
- **JSON Processing**: Support for nested objects and arrays
- **CSV Handling**: Automatic header detection and row parsing
- **Performance**: Efficient processing with pagination

### Filtering System
- **Global Search**: Search across all fields
- **Conditional Filters**: Advanced filtering with multiple conditions
- **Field Visibility**: Show/hide specific fields
- **Empty Field Toggle**: Option to show/hide empty fields

### Error Handling
- **File Validation**: Size limits, format validation
- **Content Validation**: Format-specific content validation
- **User Feedback**: Toast notifications for all errors
- **Graceful Degradation**: Error boundaries prevent app crashes

### Performance Optimizations
- **Memoization**: React.memo for expensive components
- **Debouncing**: Search input debouncing
- **Pagination**: Efficient data loading
- **Lazy Loading**: Components loaded as needed

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation
```bash
cd client
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📝 Usage

1. **Upload File**: Select an XML, JSON, or CSV file (max 500MB)
2. **Configure**: Set data type and selector (element name for XML/JSON)
3. **Preview**: Optionally preview file content before analysis
4. **Analyze**: Process the file and view results
5. **Filter**: Use search and conditional filters to find specific data
6. **Explore**: Click on items to view detailed information

## 🔒 Privacy & Security

- **Client-side Only**: All processing happens in the browser
- **No Server Storage**: Files are never uploaded to servers
- **Local Processing**: Data stays on your device
- **No Tracking**: No analytics or data collection

## 🐛 Error Handling

The application includes comprehensive error handling:

- **File Upload Errors**: Size limits, format validation
- **Parsing Errors**: Invalid file content detection
- **Network Errors**: Graceful handling of connection issues
- **UI Errors**: Error boundaries prevent app crashes
- **User Feedback**: Clear error messages via toast notifications

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme support
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: Clear feedback during processing
- **Toast Notifications**: Non-intrusive user feedback

## 🔧 Development

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Error Boundaries**: React error handling

### Performance
- **Bundle Optimization**: Tree shaking and code splitting
- **Image Optimization**: Next.js image optimization
- **Caching**: Efficient caching strategies
- **Memory Management**: Proper cleanup and garbage collection

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

We welcome contributions from the community! If you'd like to contribute to Viewify:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/azadyildiz/viewify/issues)
- **Discussions**: [GitHub Discussions](https://github.com/azadyildiz/viewify/discussions)
- **Email**: [Contact Developer](mailto:dev.azadyildiz@gmail.com)

## 🙏 Acknowledgments

Special thanks to the open-source community for the amazing tools and libraries that made this project possible:

- [Next.js](https://nextjs.org/) - React framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icons
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## 📋 Legal Documents

- [Privacy Policy](PRIVACY.md) - How we protect your data and privacy
- [Terms of Service](TERMS.md) - Service terms and conditions  
- [Cookie Policy](COOKIES.md) - How we use cookies and similar technologies

---

**Made with ❤️ by [Azad Yıldız](https://github.com/azadyildiz/)** 
