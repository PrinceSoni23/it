const Widgets = () => {
    const widgetData = [
      { title: "Offers Sent Today", value: "10" },
      { title: "Total Revenue", value: "$5000" },
      { title: "New Leads", value: "5" },
      { title: "Closed Leads", value: "8" },
    ];
  
    return (
      <div className="grid grid-cols-4 gap-4 pb-5">
        {widgetData.map((widget, index) => (
          <div key={index} className="bg-white/90 text-slate-700 p-5 rounded shadow hover:bg-white">
            <h3 className="text-lg font-semibold">{widget.title}</h3>
            <p className="text-2xl font-bold">{widget.value}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Widgets;
  