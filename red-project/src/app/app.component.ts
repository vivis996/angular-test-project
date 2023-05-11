import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appStatus = new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });
  servers = [
    {
      instanceType: 'medium',
      name: 'Production',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    }
  ];
  filteredStatus: string = '';
  nameServers: string[] = [ 'Develop', 'Production', 'Test', 'QA' , 'Testing', 'Database' ];
  instaceTypes: string[] = [ 'small', 'medium', 'large' ];
  status: string[] = [ 'stable', 'offline', 'critical' ];

  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === this.status[0],
      'list-group-item-warning': server.status === this.status[1],
      'list-group-item-danger': server.status === this.status[2]
    };
  }

  getRandom(limit: number): number{
    return Math.floor(Math.random() * limit);
  }

  onAddServer() {
    this.servers.push({
      instanceType: this.instaceTypes[this.getRandom(this.instaceTypes.length)],
      name: this.nameServers[this.getRandom(this.nameServers.length)] + (this.getRandom(2) == 0 ? '' : ' Environment') + ' Server',
      status: this.status[this.getRandom(this.status.length)],
      started: new Date(11, 5, 2023),
    });
  }
}
