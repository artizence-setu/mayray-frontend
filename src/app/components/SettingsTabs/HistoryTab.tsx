 function HistoryTab({ activeSubTab }: { activeSubTab: string }) {
  return (
    <div className="text-white">
         <h6 className="text-xl text-[#333333] font-semibold pb-4">History</h6>
      <div className="border-1 border-[#FFFFFF32] mb-4"></div>
      {activeSubTab === "chat" && (
        <>
        <div className="bg-[#4F4F4F] text-white rounded-2xl p-4">
          <p>Search top 10 news in google chrome and find the key notes keep in xl and send me over the gmail</p>
          </div>
        <div className="bg-[#4F4F4F] text-white rounded-2xl p-4 mt-4">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>
          
          </div>
            <div className="bg-[#4F4F4F] float-right text-white rounded-2xl p-4 mt-4 inline-block">
          <p>Thanku you</p>
          </div>
        </>
      )}
      {activeSubTab === "news" && (
        <>
        <div className="bg-[#4F4F4F] text-white rounded-2xl p-4">
          <p>Search top 10 news in google chrome and find the key notes keep in xl and send me over the gmail</p>
          </div>
        </>
      )}
      {activeSubTab === "places" && (
        <>
          <div className="bg-[#4F4F4F] float-right text-white rounded-2xl p-4 mt-4 inline-block">
          <p>Thanku you</p>
          </div>
        </>
      )}
    </div>
  )
}


export default HistoryTab