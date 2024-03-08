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
  _filterText: string = '';
  filteredEmployees: Employee[];
  // searchQuery: string = '';
  get filterText() {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.filteredEmployees = this.filterEmployees(value);
  }
  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.filteredEmployees = [];
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
        this.filteredEmployees = employees;
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

    // console.log(newEmployee.emp_Date_of_Joining, newEmployee.emp_Date_of_Birth);
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
    // console.log(updatedEmployee);
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
  async importCsv(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async () => {
        const csvData: string = reader.result as string;
        const employeesData: Employee[] = this.parseCsvData(csvData);

        await this.createEmployeesFromCsv(employeesData);
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

    for (let i = 1; i < lines.length; i++) {
      const values: string[] = lines[i].split(',');
      // console.log('Values:', values); // Add this line to check the structure of the values array

      // Add a check to ensure values array has enough elements
      if (values.length >= 13) {
        const employee: Employee = {
          emp_ID: values[0].trim(),
          emp_First_Name: values[1].trim(),
          emp_Last_Name: values[2].trim(),
          emp_Date_of_Birth: new Date(values[3].trim()),
          emp_Date_of_Joining: new Date(values[4].trim()),
          emp_Dept_ID: parseInt(values[5].trim(), 10),
          emp_Grade: values[6].trim(),
          emp_Designation: values[7].trim(),
          emp_Basic: parseFloat(values[8].trim()),
          emp_Gender: values[9].trim(),
          emp_Marital_Status: values[10].trim(),
          emp_Home_Address: values[11].trim(),
          emp_Contact_Num: values[12].trim(),
        };

        employees.push(employee);
      } else {
        console.error('Invalid data format in line:', lines[i]);
        // Handle the error or skip this line
      }
    }
    // console.log(employees);
    return employees;
  }

  async createEmployeesFromCsv(employees: Employee[]): Promise<void> {
    const failedEmployees: Employee[] = [];
    const successfulEmployees: Employee[] = [];
    let counter = 0;

    for (let employee of employees) {
      try {
        const createdEmployee: Employee | undefined = await this.employeeService
          .createEmployeeCSV(employee)
          .toPromise();
        if (createdEmployee) {
          successfulEmployees.push(createdEmployee);
        } else {
          // Handle the case where createdEmployee is undefined
          console.error(
            'Error creating employee: Created employee is undefined'
          );
          failedEmployees.push(employee);
        }
      } catch (error) {
        console.error('Error creating employee:', error);
        failedEmployees.push(employee);
      } finally {
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
    }
  }
  createEmployeeCSV(value: Employee): void {
    console.log(value);
    this.employeeService.createEmployee(value).subscribe(
      (createdEmployee: Employee) => {
        this.employees.push(createdEmployee);
        this.closeModal();
      },
      (error) => {
        console.error('Error creating employee:', error);
      }
    );
  }

  filterEmployees(filterTerm: string) {
    if (this.employees.length === 0 || filterTerm === '') {
      return this.employees;
    } else {
      const searchTerm = filterTerm.toLowerCase();
      return this.filteredEmployees.filter((employee) =>
        Object.values(employee).some(
          (value) =>
            value && value.toString().toLowerCase().includes(searchTerm)
        )
      );
    }
  }
}
