import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DepartmentserviceService,
  Department,
} from '../../../../../../services/api/department/departmentservice.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-read-department',
  templateUrl: './read-department.component.html',
  styleUrls: ['./read-department.component.css'],
})
export class ReadDepartmentComponent implements OnInit {
  departments: Department[] = [];
  modalTitle: string = '';
  departmentForm: FormGroup;
  selectedDepartment: Department = {};
  blurBackground: boolean = false;
  constructor(
    private departmentApiService: DepartmentserviceService,
    private formBuilder: FormBuilder
  ) {
    this.departmentForm = this.formBuilder.group({
      dept_ID: [''],
      dept_Name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentApiService.getDepartments().subscribe(
      (departments: Department[]) => {
        this.departments = departments;
      },
      (error) => {
        console.error('Error fetching departments:', error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    );
  }

  showModal: boolean = false;

  openCreateModal(): void {
    this.modalTitle = 'Create Department';
    this.clearForm();
    this.showModal = true;
    this.blurBackground = true;
  }
  openEditModal(department: Department): void {
    this.modalTitle = 'Edit Department';
    this.selectedDepartment = department;
    this.departmentForm.patchValue({
      dept_ID: department.dept_ID,
      dept_Name: department.dept_Name,
    });
    this.showModal = true;
    this.blurBackground = true;
  }

  submitForm(): void {
    if (this.modalTitle === 'Create Department') {
      this.createDepartment();
    } else {
      this.updateDepartment();
    }
  }

  createDepartment(): void {
    const newDepartment: Department = {
      dept_ID: 1,
      dept_Name: this.departmentForm.value.dept_Name,
    };

    this.departmentApiService.createDepartment(newDepartment).subscribe(
      (createdDepartment: Department) => {
        this.departments.push(createdDepartment);
        this.closeModal();
      },
      (error) => {
        console.error('Error creating department:', error);
      }
    );
  }

  updateDepartment(): void {
    const updatedDepartment: Department = this.departmentForm.value;
    console.log(updatedDepartment);
    this.departmentApiService.updateDepartment(updatedDepartment).subscribe(
      (updatedDept: Department) => {
        const index = this.departments.findIndex(
          (d) => d.dept_ID === updatedDept.dept_ID
        );
        if (index !== -1) {
          this.departments[index] = updatedDept;
        }
        this.closeModal();
      },
      (error) => {
        console.error('Error updating department:', error);
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
    this.departmentForm.reset();
  }

  deleteDepartment(departmentId: number): void {
    // Find the index of the department with the provided departmentId
    const index = this.departments.findIndex((d) => d.dept_ID === departmentId);

    // If the department is found, remove it from the array using slice
    if (index !== -1) {
      this.departments = [
        ...this.departments.slice(0, index),
        ...this.departments.slice(index + 1),
      ];
    }
    this.departmentApiService.deleteDepartment(departmentId).subscribe(
      (updatedDepartments: Department[]) => {
        // Update the departments array with the updated list
        this.departments = updatedDepartments;
      },
      (error) => {
        console.error('Error deleting department:', error);
      }
    );
  }
}
