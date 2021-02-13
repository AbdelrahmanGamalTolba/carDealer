import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Model/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AlertifyService } from 'src/app/services/alertify.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
 registrationForm:FormGroup;
 user: User;
 userSubmitted: boolean;
  constructor(private fb: FormBuilder , private Uservice: UserServiceService, private Alertify: AlertifyService) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl(null,Validators.required),
    //   email: new FormControl(null,[Validators.required,Validators.email]),
    //   password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null,[Validators.required]),
    //   mobile: new FormControl(null,[Validators.required,Validators.maxLength(11)]),
    // },this.passwordMatchingValidation);
    this.CreateRegistrationForm();
  }

  CreateRegistrationForm(){
    this.registrationForm=this.fb.group({
      userName:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(8)]],
      confirmPassword:[null,Validators.required],
      mobile:[null, [Validators.required,Validators.maxLength(11)]]
    },{Validators:this.passwordMatchingValidation});
  }

  passwordMatchingValidation(fg:FormGroup):Validators{
    return fg.get('passwords').value === fg.get('confirmPassword').value ? null:
    {notmatched:true};
  }

  get Username(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get Email(){
    return this.registrationForm.get('email') as FormControl;
  }
  get Password(){
    return this.registrationForm.get('password') as FormControl;
  }
  get ConfirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get Mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }
  onSubmit(){
    console.log(this.registrationForm.value);
    this.userSubmitted=true;
    if(this.registrationForm.valid){
    // this.user= Object.assign(this.user,this.registrationForm.value);
    this.Uservice.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted=false;
    this.Alertify.success('Successfully registered');
    } else{
      this.Alertify.error('Kindly provide the required fields');
    }
  }

  userData() : User{
    return this.user= {
      userName: this.Username.value,
      email: this.Email.value,
      password:this.Password.value,
      mobile:this.Mobile.value
    }
  }
}
