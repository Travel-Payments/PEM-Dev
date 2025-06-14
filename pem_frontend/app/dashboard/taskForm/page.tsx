"use client";
import { Poppins } from "next/font/google"
import styles from './task.module.css'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '400'
})

export default function TaskFormPage() {
    return (
        <form className={`${poppins.className} ${styles.taskForm}`}>
            <p className={`${styles.taskHeader}`}> New Task Entry </p>
            <div className={styles.taskFormInput}>
                <input type="text" placeholder="Title" className="w-full border-none outline-none" required />
            </div>
            <div className={`${styles.taskFormTime}`}> 
                <div className={`${styles.taskFormInput1} translate-x-[-0px]`}>
                    <label> Date: </label>
                    <input type="date" title="date" className="border-none outline-none" required />
                </div>
                 <div className={`${styles.taskFormInput1} translate-x-[-0px]`}>
                    <label> Time: </label>
                    <input type="time" placeholder="Time" className="border-none outline-none" required />
                </div> 
            </div>
            <div className={styles.taskFormInput}>
                <textarea placeholder="Task Description" className={`${styles.taskFormInputDesc} border-none outline-none`} required></textarea>
            </div>
            <div>
                <button type="submit" className={`${styles.taskFormSubmit}`}> Submit </button>
            </div>
        </form>
    )
}