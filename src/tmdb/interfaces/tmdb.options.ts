export interface TmdbOptions {
  certification?: string;
  certification_gte?: string;
  certification_lte?: string;
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  page?: number;
  primary_release_year?: number;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  region?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  sort_by?: string;
  'vote_average.gte'?: number;
  vote_average_lte?: number;
  'vote_count.gte'?: number;
  vote_count_lte?: number;
  watch_region?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  with_release_type?: number;
  ' with_runtime.gte'?: number;
  with_runtime_lte?: number;
  with_watch_monetization_types?: string;
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
}

export const defaultOptions: TmdbOptions = {
  sort_by: 'release_date.asc',
  'vote_count.gte': 1500,
  'vote_average.gte': 8.4,
  watch_region: 'TR',
  with_watch_providers: '8',
};
