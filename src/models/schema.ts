export const FAIR = "https://w3id.org/fair/principles/terms/";
export const LDP = "http://www.w3.org/ns/ldp#";
export const SIOC = "http://rdfs.org/sioc/ns#";
export const SIOCT = "http://rdfs.org/sioc/types#";
export const DCTYPES = "http://purl.org/dc/dcmitype/";
export const VCARD = "http://www.w3.org/2006/vcard/ns#";
export const GEO = "http://www.w3.org/2003/01/geo/wgs84_pos#";
export const TIME = "http://www.w3.org/2006/time#";
export const DOAP = "http://usefulinc.com/ns/doap#";
export const ODRL = "http://www.w3.org/ns/odrl/2/";
export const PROV = "http://www.w3.org/ns/prov#";
export const PIM = "http://www.w3.org/ns/pim/space#";
export const POSIX = "http://www.w3.org/ns/posix/stat#";
export const MEETING = "http://www.w3.org/ns/pim/meeting#";
export const SCHED = "http://www.w3.org/ns/pim/schedule#";
export const MO = "http://purl.org/ontology/mo/";
export const OLO = "http://purl.org/ontology/olo/core#";
export const OPO = "http://online-presence.net/opo/ns#";
export const OPM = "http://open.vocab.org/terms/";
export const WOT = "http://xmlns.com/wot/0.1/";
export const CERT = "http://www.w3.org/ns/auth/cert#";
export const ACL = "http://www.w3.org/ns/auth/acl#";
export const UI = "http://www.w3.org/ns/ui#";
export const TMP = "http://www.w3.org/2001/10/tmp#";
export const GEN = "http://www.w3.org/2006/gen/ont#";

// External common ontologies (prefixes/URIs)
export const RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
export const RDFS = "http://www.w3.org/2000/01/rdf-schema#";
export const OWL = "http://www.w3.org/2002/07/owl#";
export const FOAF = "http://xmlns.com/foaf/0.1/";
export const SCHEMA = "http://schema.org/";
export const OGP = "http://ogp.me/ns#";
export const WIKIDATA = "http://www.wikidata.org/entity/";
export const DCTERMS = "http://purl.org/dc/terms/";
export const DC = "http://purl.org/dc/elements/1.1/";
export const SKOS = "http://www.w3.org/2004/02/skos/core#";
export const XSD = "http://www.w3.org/2001/XMLSchema#";
// Add more as needed

// Import RDF/OWL ontologies as resources for use in the application
// (Assumes use of a library like rdflib.js, rdf-ext, or similar for parsing TTL files)

import activities from '../ontologies/activities.ttl';
import agents from '../ontologies/agents.ttl';
import calendar from '../ontologies/calendar.ttl';
import chat from '../ontologies/chat.ttl';
import Emoji from '../ontologies/Emoji .ttl';
import event from '../ontologies/event.ttl';
import meeting from '../ontologies/meeting.ttl';
import person from '../ontologies/person.ttl';
import project from '../ontologies/project.ttl';
import social from '../ontologies/social.ttl';
import socialWeb from '../ontologies/social-web.ttl';
import subscriptions from '../ontologies/subscriptions.ttl';
import task from '../ontologies/task.ttl';
import tickets from '../ontologies/tickets.ttl';
import toDo from '../ontologies/to-do.ttl';
import training from '../ontologies/training.ttl';

export {
	activities,
	agents,
	calendar,
	chat,
	Emoji,
	event,
	meeting,
	person,
	project,
	social,
	socialWeb,
	subscriptions,
	task,
	tickets,
	toDo,
	training
};
