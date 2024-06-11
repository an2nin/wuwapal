// export default function Announcement() {
//     return (
//         <div className="w-full bg-black container text-center p-1 text-sm">
//             This website is still under development. Send me a
//             <a
//                 href="mailto:wuwapal@gmail.com?subject=Feedback for WuWaPal&body=Hello, My feedback: "
//                 className="text-primary font-bold  hover:text-primary/40 mx-1 underline"
//             >
//                 mail
//             </a>
//             to share your feedback!
//         </div>
//     );
// }

export default function Announcement() {
    return (
        <div className="w-full bg-black container text-center p-1 text-sm">
            <p>
                Global Statistics UI currently at development please provide pull data
                by importing or refreshing the records. Ensure the
                <span className="font-bold mx-1">
                    &quot;Submit pity for global pull stats&quot; is checked
                </span>
                .
            </p>
        </div>
    );
}
