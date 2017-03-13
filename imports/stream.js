const Streamer = new Meteor.Streamer('chat', {retransmitToSelf: true});
export default Streamer;
