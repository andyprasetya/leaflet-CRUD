CREATE TABLE data_point (
	gid integer NOT NULL,
	notes character varying(255) DEFAULT ''::character varying NOT NULL,
	geom geometry(Point,4326)
);
ALTER TABLE public.data_point OWNER TO postgis_user;
COMMENT ON TABLE data_point IS 'SAMPLE DATA POINT';
CREATE SEQUENCE data_point_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.data_point_gid_seq OWNER TO postgis_user;
ALTER SEQUENCE data_point_gid_seq OWNED BY data_point.gid;
ALTER TABLE ONLY data_point ALTER COLUMN gid SET DEFAULT nextval('data_point_gid_seq'::regclass);
ALTER TABLE ONLY data_point ADD CONSTRAINT data_point_pkey PRIMARY KEY (gid);
CREATE INDEX data_point_geom_gist ON data_point USING gist (geom);

CREATE TABLE data_linestring (
	gid integer NOT NULL,
	notes character varying(255) DEFAULT ''::character varying NOT NULL,
	geom geometry(LineString,4326)
);
ALTER TABLE public.data_linestring OWNER TO postgis_user;
COMMENT ON TABLE data_linestring IS 'SAMPLE DATA LINESTRING';
CREATE SEQUENCE data_linestring_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.data_linestring_gid_seq OWNER TO postgis_user;
ALTER SEQUENCE data_linestring_gid_seq OWNED BY data_linestring.gid;
ALTER TABLE ONLY data_linestring ALTER COLUMN gid SET DEFAULT nextval('data_linestring_gid_seq'::regclass);
ALTER TABLE ONLY data_linestring ADD CONSTRAINT data_linestring_pkey PRIMARY KEY (gid);
CREATE INDEX data_linestring_geom_gist ON data_linestring USING gist (geom);

CREATE TABLE data_polygon (
	gid integer NOT NULL,
	notes character varying(255) DEFAULT ''::character varying NOT NULL,
	geom geometry(Polygon,4326)
);
ALTER TABLE public.data_polygon OWNER TO postgis_user;
COMMENT ON TABLE data_polygon IS 'SAMPLE DATA POLYGON';
CREATE SEQUENCE data_polygon_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.data_polygon_gid_seq OWNER TO postgis_user;
ALTER SEQUENCE data_polygon_gid_seq OWNED BY data_polygon.gid;
ALTER TABLE ONLY data_polygon ALTER COLUMN gid SET DEFAULT nextval('data_polygon_gid_seq'::regclass);
ALTER TABLE ONLY data_polygon ADD CONSTRAINT data_polygon_pkey PRIMARY KEY (gid);
CREATE INDEX data_polygon_geom_gist ON data_polygon USING gist (geom);