function Icon({ type }) {
    const types = [
      { id: 1, name: "education", description: "school and other educational pursuits and accomplishments", emoji: "✏️" },
      { id: 2, name: "self growth", description: "self-improvement pursuits and accomplishments", emoji: "🌱" },
      { id: 3, name: "achievements", description: "personal goal completion", emoji: "🏆" },
      { id: 4, name: "life change", description: "relocation or life changes", emoji: "✈️" }
    ];
  
    const selectedType = types.find(item => item.id === type);
    const icon = selectedType ? selectedType.emoji : "";
  
    return (
      <div className="icon">{icon}</div>
    );
  }
  
  export default Icon;