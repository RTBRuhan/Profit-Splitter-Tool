# **Profit Splitter**

## **The Story Behind Profit Splitter**
My young neighbor was starting a business with his two friends. They were pooling their money, time, and effort into this venture, but they struggled to keep track of who contributed what and how to fairly split the profits. They came to me for help, and I decided to create this small tool to make their lives easier.

**Profit Splitter** is a simple yet powerful React-based tool that helps teams or groups of investors track investments, workloads, and profit sharing. It ensures transparency and fairness by dynamically adjusting percentages based on contributions. Whether you're running a small business with friends or managing group investments, this tool can help you stay organized.

---

## **Features**
- **Dynamic Investment Tracking**: Adjust investment amounts and see real-time updates.
- **Workload Balancing**: Allocate workloads among members and balance them dynamically.
- **Profit Sharing**: Automatically calculates profit shares based on contributions.
- **Customizable Investors**: Add or remove investors easily and rename them as needed.
- **User-Friendly Interface**: A clean, self-explanatory UI for quick adjustments.

---

## **How to Use**

### **Step 1: Download the Repository**
1. Clone the repository or download it as a ZIP file.
2. Extract the ZIP file if downloaded.

### **Step 2: Run the Setup**
1. Navigate to the folder where you extracted the files.
2. Double-click on `setup.bat` (Windows only).
3. The setup will:
- Create a new React app in a folder named `my-react-app`.
- Install all necessary dependencies (including Material-UI).
- Copy your scripts (`App.js` and `InvestmentTool.js`) into the `src` folder of the React app.
- Generate a `run.bat` file for starting the app.

4. If the setup completes but you don’t see a `run.bat` file, simply run `setup.bat` again.

### **Step 3: Start the App**
1. Once setup is complete, double-click on `run.bat`.
2. The app will start, and your default browser will open at `http://localhost:3000`.

---

## **Interface Overview**
The interface is designed to be intuitive:
- Adjust workloads, payloads (investments), and profit shares using sliders or by entering values directly.
- Add or remove investors as needed.
- Rename investors for better clarity.
- Toggle between percentage mode and actual amount mode for investments.

---

## **Technical Details**
Profit Splitter is built using:
- **React**: For building the user interface.
- **Material-UI**: For sleek and responsive design components.

The core logic dynamically balances workloads, payloads, and profits to ensure fairness among all investors.

---

## **Troubleshooting**
1. If `setup.bat` closes unexpectedly:
- Ensure you have Node.js installed on your system ([Download Node.js](https://nodejs.org/)).
- Run `setup.bat` again after fixing any issues.

2. If you encounter dependency issues:
- Open a terminal in the `my-react-app` folder.
- Run:
  ```
  npm install --legacy-peer-deps
  ```

3. If the app doesn’t start:
- Navigate to the `my-react-app` folder in a terminal.
- Run:
  ```
  npm start
  ```

---

## **Why Profit Splitter?**
This tool was born out of necessity—to help my neighbor and his friends manage their startup investments fairly. It’s lightweight, easy to use, and tailored for small teams or groups who want transparency in their financial dealings.

---

## **Contributing**
Feel free to fork this repository and contribute! Whether it’s improving functionality or adding new features, your input is welcome.

---

## **License**
This project is licensed under the MIT License—use it freely!
