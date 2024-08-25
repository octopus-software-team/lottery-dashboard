import useGetLotteryWinners from "../../hooks/useGetLotteryWinners";

export default function ChooseWinner({ lottery, formData }) {
  const { data: winners } = useGetLotteryWinners(
    lottery?.id,
    formData?.category_id,
    formData?.main
  );
  return (
    <>
      <div className="lottery_info">
        <h3>{lottery?.title}</h3>
        <ul>
          <li>
            <img src="/assets/images/calendar.svg" alt="calender" />
            اخر موعد للتسجيل: {lottery?.to_date}
          </li>
          <li>
            <img src="/assets/images/users.svg" alt="users" />
            عدد المسجلين بالقرعة حتى الآن: {lottery?.usersCount}
          </li>
        </ul>
      </div>
      <div className="d-flex justify-content-center">
        <video
          src="/assets/images/winners.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="winners_div">
        <h3 className="table-title blue">قرعة رئيسية</h3>
        <ul>
          {winners?.map((winner, index) => (
            <li key={index}>
              الفائز {index + 1}: <span>{winner?.user?.full_name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
