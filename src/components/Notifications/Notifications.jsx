import style from './Notifications.module.scss'
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function Notifications() {
    return (
        <div>
          <button className='btn btn-info'
            onClick={this.createNotification('info')}>Info
          </button>
          <hr/>
          <button className='btn btn-success'
            onClick={this.createNotification('success')}>Success
          </button>
          <hr/>
          <button className='btn btn-warning'
            onClick={this.createNotification('warning')}>Warning
          </button>
          <hr/>
          <button className='btn btn-danger'
            onClick={this.createNotification('error')}>Error
          </button>
  
          <NotificationContainer/>
        </div>
      );
}
// const NotificationManager = window.ReactNotifications.NotificationManager;