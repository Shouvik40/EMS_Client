import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EmployeeService,
  Employee,
} from '../../../../../../services/api/employee/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  employees: Employee[] = [];
  modalTitle: string = '';
  employeeForm: FormGroup;
  selectedEmployee: Employee = {};
  blurBackground: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      emp_ID: [''],
      emp_First_Name: ['', Validators.required],
      emp_Last_Name: ['', Validators.required],
      emp_Date_of_Birth: ['', Validators.required],
      emp_Date_of_Joining: ['', Validators.required],
      emp_Dept_ID: ['', Validators.required],
      emp_Grade: ['', Validators.required],
      emp_Designation: ['', Validators.required],
      emp_Basic: ['', Validators.required],
      emp_Gender: ['', Validators.required],
      emp_Marital_Status: ['', Validators.required],
      emp_Home_Address: ['', Validators.required],
      emp_Contact_Num: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  isEditMode(): boolean {
    return this.modalTitle === 'Edit Employee';
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    );
  }
  showModal: boolean = false;
  openCreateModal(): void {
    this.modalTitle = 'Create Employee';
    this.clearForm();
    this.showModal = true;
    this.blurBackground = true;
  }

  openEditModal(employee: Employee): void {
    this.modalTitle = 'Edit Employee';
    const dateOfBirth = employee.emp_Date_of_Birth
      ? new Date(employee.emp_Date_of_Birth)
      : null;
    const dateOfJoining = employee.emp_Date_of_Joining
      ? new Date(employee.emp_Date_of_Joining)
      : null;

    this.selectedEmployee = employee;
    this.employeeForm.patchValue({
      emp_ID: employee.emp_ID || '',
      emp_First_Name: employee.emp_First_Name || '',
      emp_Last_Name: employee.emp_Last_Name || '',
      emp_Date_of_Birth: dateOfBirth || null,
      emp_Date_of_Joining: dateOfJoining || null,
      emp_Dept_ID: employee.emp_Dept_ID || 1,
      emp_Grade: employee.emp_Grade || 'M1',
      emp_Designation: employee.emp_Designation || '',
      emp_Basic: employee.emp_Basic || null,
      emp_Gender: employee.emp_Gender || '',
      emp_Marital_Status: employee.emp_Marital_Status || '',
      emp_Home_Address: employee.emp_Home_Address || '',
      emp_Contact_Num: employee.emp_Contact_Num || '',
    });

    this.showModal = true;
    this.blurBackground = true;
  }

  submitForm(): void {
    if (this.modalTitle === 'Create Employee') {
      this.createEmployee();
    } else {
      this.updateEmployee();
    }
  }

  createEmployee(): void {
    const newEmployee: Employee = this.employeeForm.value;
    console.log(newEmployee.emp_Date_of_Joining, newEmployee.emp_Date_of_Birth);
    this.employeeService.createEmployee(newEmployee).subscribe(
      (createdEmployee: Employee) => {
        this.employees.push(createdEmployee);
        this.closeModal();
      },
      (error) => {
        console.error('Error creating employee:', error);
      }
    );
  }

  updateEmployee(): void {
    const updatedEmployee: Employee = this.employeeForm.value;
    console.log(updatedEmployee);
    this.employeeService.updateEmployee(updatedEmployee).subscribe(
      (updatedEmp: Employee) => {
        const index = this.employees.findIndex(
          (e) => e.emp_ID === updatedEmp.emp_ID
        );
        if (index !== -1) {
          this.employees[index] = updatedEmp;
        }
        this.closeModal();
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  }

  closeModal(): void {
    this.modalTitle = '';
    this.clearForm();
    this.showModal = false;
    this.blurBackground = false;
  }

  clearForm(): void {
    this.employeeForm.reset();
  }

  deleteEmployee(emp_ID: string): void {
    const index = this.employees.findIndex((e) => e.emp_ID === emp_ID);
    if (index !== -1) {
      this.employees = [
        ...this.employees.slice(0, index),
        ...this.employees.slice(index + 1),
      ];
    }

    this.employeeService.deleteEmployee(emp_ID).subscribe(
      (updatedEmployees: Employee[]) => {
        this.employees = updatedEmployees;
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
  importCsv(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csvData: string = reader.result as string;
        const employees: Employee[] = this.parseCsvData(csvData);
        this.createEmployeesFromCsv(employees);
      };
      reader.onerror = (error) => {
        console.error('Error reading CSV file:', error);
        // Handle error appropriately
      };
    }
  }
  parseCsvData(csvData: string): Employee[] {
    const lines: string[] = csvData.split('\n');
    const employees: Employee[] = [];
    for (let line of lines) {
      const parts: string[] = line.split(',');
      const employee: Employee = {
        // Assuming CSV format: emp_ID,emp_First_Name,emp_Last_Name,...
        emp_ID: parts[0].trim(),
        emp_First_Name: parts[1].trim(),
        emp_Last_Name: parts[2].trim(),
        // Add more properties as needed
      };
      employees.push(employee);
    }
    return employees;
  }
  createEmployeesFromCsv(employees: Employee[]): void {
    const failedEmployees: Employee[] = [];
    const successfulEmployees: Employee[] = [];
    let counter = 0;
    for (let employee of employees) {
      this.employeeService.createEmployee(employee).subscribe(
        (createdEmployee: Employee) => {
          successfulEmployees.push(createdEmployee);
        },
        (error) => {
          console.error('Error creating employee:', error);
          failedEmployees.push(employee);
        },
        () => {
          counter++;
          if (counter === employees.length) {
            if (failedEmployees.length > 0) {
              console.warn(
                'Failed to create the following employees:',
                failedEmployees
              );
              // Handle failed employees appropriately
            }
            // Clear the array of failed employees
            failedEmployees.splice(0, failedEmployees.length);
            // Optionally, do something with successful employees
          }
        }
      );
    }
  }
}
